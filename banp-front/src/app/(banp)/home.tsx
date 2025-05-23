import { Recommendation } from '@/@types';
import { api } from '@/services/axios';
import { theme } from '@/styles/theme';
import { calculateAge } from '@/utils/age';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [page, setPage] = useState(1);

  const person = recommendations[recommendationIndex];

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startGlowing();
  }, []);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const token = await AsyncStorage.getItem('@banp:token');

        const { data } = await api.get('/match/recommendation', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            take: 5,
            page: page
          }
        });

        setRecommendations(data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    getRecommendations();
  }, [page]);

  const handleLikeOrDislike = async (like: boolean) => {
    try {
      const token = await AsyncStorage.getItem('@banp:token');

      const { data } = await api.post(
        `/match/${person.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            response: like ? 'like' : 'unlike'
          }
        }
      );

      if (data.is_match) {
        return Alert.alert('Congratulations!', 'You have a new match to play!');
      }

      if (recommendationIndex < recommendations.length - 1) {
        setRecommendationIndex(recommendationIndex + 1);
      } else {
        setPage(page + 1);
        setRecommendationIndex(0);
      }
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const startGlowing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false // We can't use native driver for shadow properties
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        })
      ])
    ).start();
  };

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 30] // Radius of the glow effect
  });

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1] // Opacity of the glow effect
  });

  return (
    <SafeAreaView style={styles.container}>
      {recommendations.length > 0 && (
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.photoContainer,
              {
                shadowRadius,
                shadowOpacity,
                shadowColor: theme.colors.primary[300],
                shadowOffset: { width: 0, height: 0 }, // Adjust the shadow offset
                ...Platform.select({
                  android: {
                    elevation: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [5, 30]
                    })
                  }
                })
              }
            ]}
          >
            <Image
              style={styles.photo}
              source={{
                uri: person.image
              }}
            />
          </Animated.View>
          <Text style={styles.displayName}>{person.name}</Text>
          <Text style={styles.text}>
            {person.gender === 'M' ? 'Male' : 'Female'} · {calculateAge(person.birthDate)}yo
          </Text>
          <View style={styles.games}>
            {person.games.map(({ id, name }) => (
              <Text
                key={id}
                style={styles.gameTag}
              >
                {name}
              </Text>
            ))}
          </View>
        </View>
      )}
      {recommendations.length > 0 && (
        <View style={styles.action}>
          <TouchableOpacity
            style={[styles.thumbContainer, styles.thumbsDown]}
            onPress={() => handleLikeOrDislike(false)}
          >
            <Feather
              name="thumbs-down"
              size={24}
              color={theme.colors.functional.error.main}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.thumbContainer, styles.thumbsUp]}
            onPress={() => handleLikeOrDislike(true)}
          >
            <Feather
              name="thumbs-up"
              size={24}
              color={theme.colors.functional.success.main}
            />
          </TouchableOpacity>
        </View>
      )}

      {recommendations.length === 0 && (
        <View style={styles.noContent}>
          <Feather
            name="frown"
            size={128}
            color={theme.colors.neutral[500]}
          />
          <Text style={styles.noContentText}>No more recommendations for now.{'\n'} Check back later!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[600],
    paddingVertical: 64,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32
  },
  header: {
    alignItems: 'center',
    gap: 16,
    width: '100%'
  },
  photoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.colors.primary[200]
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.neutral[100]
  },
  text: {
    fontSize: 16,
    color: theme.colors.neutral[100]
  },
  games: {
    flexDirection: 'row',
    gap: 8
  },
  gameTag: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.neutral[100],
    backgroundColor: theme.colors.primary[400],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4
  },
  action: {
    flexDirection: 'row',
    gap: 96
  },
  thumbContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbsUp: {
    backgroundColor: theme.colors.functional.success.bg,
    borderColor: theme.colors.functional.success.main,
    borderWidth: 2
  },
  thumbsDown: {
    backgroundColor: theme.colors.functional.error.bg,
    borderColor: theme.colors.functional.error.main,
    borderWidth: 2
  },
  noContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  noContentText: {
    fontSize: 14,
    color: theme.colors.neutral[400],
    textAlign: 'center',
    lineHeight: 24
  }
});

export default Home;
