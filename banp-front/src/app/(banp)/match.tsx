import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IMatch } from '@/@types';
import { api } from '@/services/axios';
import { FontAwesome6 } from '@expo/vector-icons';

import { Input } from '@/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

const Match = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [search, setSearch] = useState('');

  const filteredMatches = matches.filter((match) => match.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const getMatches = async () => {
      try {
        const token = await AsyncStorage.getItem('@banp:token');

        const { data } = await api.get('/match', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            take: 10,
            page: 1
          }
        });

        setMatches(data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    getMatches();
  }, []);

  const copyDiscordName = async (name: string) => {
    await Clipboard.setStringAsync(name);

    Toast.show({
      type: 'custom',
      text1: 'Copied to clipboard!',
      text2: 'Now you can paste it on Discord.'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
      </View>
      <View style={styles.search}>
        <Input.Text
          placeholder="Search for a match"
          icon="search"
          value={search}
          onChangeText={(value) => setSearch(value)}
        />
      </View>
      <FlatList
        data={filteredMatches}
        keyExtractor={(match) => match.id.toString()}
        ListEmptyComponent={() => <Text style={styles.noContent}>No matches found</Text>}
        renderItem={({ item }) => (
          <View
            style={styles.match}
            key={item.id}
          >
            <View style={styles.info}>
              <Image
                source={{ uri: item.image }}
                style={styles.photo}
              />
              <View style={styles.textInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.text}>{item.email}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.discord}
              onPress={() => copyDiscordName(item.discord)}
            >
              <FontAwesome6
                name="discord"
                size={20}
                color={theme.colors.neutral[100]}
              />
            </TouchableOpacity>
          </View>
        )}
      />
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
    gap: 32
  },
  header: {
    width: '100%',
    paddingBottom: 16,
    borderBottomColor: theme.colors.neutral[500],
    borderBottomWidth: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.neutral[100]
  },
  search: {
    width: '100%'
  },
  noContent: {
    fontSize: 16,
    color: theme.colors.neutral[100]
  },
  match: {
    width: '100%',
    backgroundColor: theme.colors.neutral[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 12
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 12
  },
  info: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInfo: {
    gap: 4
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.neutral[100]
  },
  discord: {
    padding: 12,
    borderRadius: 999,
    backgroundColor: theme.colors.primary[400]
  },
  text: {
    fontSize: 14,
    color: theme.colors.neutral[100]
  }
});

export default Match;
