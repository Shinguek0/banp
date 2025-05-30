import { Recommendation } from '@/@types';
import { api } from '@/services/axios';
import { theme } from '@/styles/theme';
import { calculateAge } from '@/utils/age';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
const RECOMMENDATIONS_PER_PAGE = 5;
const PHOTO_SIZE = 200;
const ICON_SIZE = 24;
const LARGE_ICON_SIZE = 128;
const THUMB_SIZE = 64;
const GLOW_DURATION = {
  IN: 600,
  OUT: 500
};
const SHADOW_RANGE = {
  MIN: 5,
  MAX: 30
};
const OPACITY_RANGE = {
  MIN: 0.3,
  MAX: 1
};

// Interfaces
interface ActionButtonProps {
  onPress: () => void;
  icon: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
}

interface UserProfileProps {
  person: Recommendation;
  glowAnim: Animated.Value;
}

interface NoContentProps {
  message: string;
}

// Custom Hooks
const useAuth = () => {
  const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('@banp:token');
  };

  return { getToken };
};

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [page, setPage] = useState(1);
  const { getToken } = useAuth();

  const fetchRecommendations = async (pageNumber: number) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');

      const { data } = await api.get('/match/recommendation', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          take: RECOMMENDATIONS_PER_PAGE,
          page: pageNumber
        }
      });

      setRecommendations(data);
    } catch (error: any) {
      console.log('Failed to fetch recommendations:', error.response?.data?.message || error.message);
    }
  };

  const nextRecommendation = () => {
    if (recommendationIndex < recommendations.length - 1) {
      setRecommendationIndex(prev => prev + 1);
    } else {
      const nextPage = page + 1;
      setPage(nextPage);
      setRecommendationIndex(0);
    }
  };

  return {
    recommendations,
    recommendationIndex,
    page,
    fetchRecommendations,
    nextRecommendation,
    currentPerson: recommendations[recommendationIndex]
  };
};

const useGlowAnimation = () => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  const startGlowing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: GLOW_DURATION.IN,
          useNativeDriver: false
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: GLOW_DURATION.OUT,
          useNativeDriver: false
        })
      ])
    ).start();
  };

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SHADOW_RANGE.MIN, SHADOW_RANGE.MAX]
  });

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [OPACITY_RANGE.MIN, OPACITY_RANGE.MAX]
  });

  return { glowAnim, startGlowing, shadowRadius, shadowOpacity };
};

// Components
const ActionButton: React.FC<ActionButtonProps> = ({ 
  onPress, 
  icon, 
  color, 
  backgroundColor, 
  borderColor 
}) => (
  <TouchableOpacity
    style={[
      styles.thumbContainer,
      { backgroundColor, borderColor }
    ]}
    onPress={onPress}
  >
    <Feather name={icon} size={ICON_SIZE} color={color} />
  </TouchableOpacity>
);

const UserProfile: React.FC<UserProfileProps> = ({ person, glowAnim }) => {
  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SHADOW_RANGE.MIN, SHADOW_RANGE.MAX]
  });

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [OPACITY_RANGE.MIN, OPACITY_RANGE.MAX]
  });

  const genderText = person.gender === 'M' ? 'Male' : 'Female';
  const age = calculateAge(person.birthDate);

  return (
    <View style={styles.header}>
      <Animated.View
        style={[
          styles.photoContainer,
          {
            shadowRadius,
            shadowOpacity,
            shadowColor: theme.colors.primary[300],
            shadowOffset: { width: 0, height: 0 },
            ...Platform.select({
              android: {
                elevation: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [SHADOW_RANGE.MIN, SHADOW_RANGE.MAX]
                })
              }
            })
          }
        ]}
      >
        <Image style={styles.photo} source={{ uri: person.image }} />
      </Animated.View>
      <Text style={styles.displayName}>{person.name}</Text>
      <Text style={styles.text}>{genderText} · {age}yo</Text>
      <View style={styles.games}>
        {person.games.map(({ id, name }) => (
          <Text key={id} style={styles.gameTag}>
            {name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const ActionButtons: React.FC<{ onLike: () => void; onDislike: () => void }> = ({ 
  onLike, 
  onDislike 
}) => (
  <View style={styles.action}>
    <ActionButton
      onPress={onDislike}
      icon="thumbs-down"
      color={theme.colors.functional.error.main}
      backgroundColor={theme.colors.functional.error.bg}
      borderColor={theme.colors.functional.error.main}
    />
    <ActionButton
      onPress={onLike}
      icon="thumbs-up"
      color={theme.colors.functional.success.main}
      backgroundColor={theme.colors.functional.success.bg}
      borderColor={theme.colors.functional.success.main}
    />
  </View>
);

const NoContent: React.FC<NoContentProps> = ({ message }) => (
  <View style={styles.noContent}>
    <Feather
      name="frown"
      size={LARGE_ICON_SIZE}
      color={theme.colors.neutral[500]}
    />
    <Text style={styles.noContentText}>{message}</Text>
  </View>
);

const Home = () => {
  const {
    recommendations,
    currentPerson,
    page,
    fetchRecommendations,
    nextRecommendation
  } = useRecommendations();

  const { glowAnim, startGlowing } = useGlowAnimation();
  const { getToken } = useAuth();

  useEffect(() => {
    startGlowing();
  }, []);

  useEffect(() => {
    fetchRecommendations(page);
  }, [page]);

  const handleLikeOrDislike = async (like: boolean) => {
    if (!currentPerson) return;

    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');

      const { data } = await api.post(
        `/match/${currentPerson.id}`,
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

      nextRecommendation();
    } catch (error: any) {
      console.error('Match action failed:', error.response?.data?.message || error.message);
    }
  };

  const hasRecommendations = recommendations.length > 0;
  const noContentMessage = "No more recommendations for now.\nCheck back later!";

  return (
    <SafeAreaView style={styles.container}>
      {hasRecommendations && currentPerson && (
        <>
          <UserProfile person={currentPerson} glowAnim={glowAnim} />
          <ActionButtons
            onLike={() => handleLikeOrDislike(true)}
            onDislike={() => handleLikeOrDislike(false)}
          />
        </>
      )}

      {!hasRecommendations && <NoContent message={noContentMessage} />}
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
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
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
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
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