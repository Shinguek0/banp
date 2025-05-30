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

// Constants
const MATCHES_PER_PAGE = 10;
const INITIAL_PAGE = 1;
const ICON_SIZE = 20;
const PHOTO_SIZE = 60;
const DISCORD_BUTTON_RADIUS = 999;
const MATCH_BORDER_RADIUS = 12;

// Toast messages
const TOAST_MESSAGES = {
  COPY_SUCCESS: {
    text1: 'Copied to clipboard!',
    text2: 'Now you can paste it on Discord.'
  }
};

// Interfaces
interface MatchItemProps {
  match: IMatch;
  onCopyDiscord: (discordName: string) => void;
}

interface SearchHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

interface EmptyStateProps {
  message: string;
}

// Custom Hooks
const useAuth = () => {
  const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('@banp:token');
  };

  return { getToken };
};

const useMatches = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');

      const { data } = await api.get('/match', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          take: MATCHES_PER_PAGE,
          page: INITIAL_PAGE
        }
      });

      setMatches(data);
    } catch (error: any) {
      console.error('Failed to fetch matches:', error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { matches, isLoading, fetchMatches };
};

const useSearch = (matches: IMatch[]) => {
  const [search, setSearch] = useState('');

  const filteredMatches = matches.filter((match) => 
    match.name.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredMatches };
};

const useClipboard = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      showSuccessToast();
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'custom',
      ...TOAST_MESSAGES.COPY_SUCCESS
    });
  };

  return { copyToClipboard };
};

// Components
const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <Text style={styles.noContent}>{message}</Text>
);

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchValue, onSearchChange }) => (
  <View style={styles.search}>
    <Input.Text
      placeholder="Search for a match"
      icon="search"
      value={searchValue}
      onChangeText={onSearchChange}
    />
  </View>
);

const MatchItem: React.FC<MatchItemProps> = ({ match, onCopyDiscord }) => (
  <View style={styles.match}>
    <View style={styles.info}>
      <Image
        source={{ uri: match.image }}
        style={styles.photo}
      />
      <View style={styles.textInfo}>
        <Text style={styles.name}>{match.name}</Text>
        <Text style={styles.text}>{match.email}</Text>
      </View>
    </View>
    <TouchableOpacity
      style={styles.discord}
      onPress={() => onCopyDiscord(match.discord)}
    >
      <FontAwesome6
        name="discord"
        size={ICON_SIZE}
        color={theme.colors.neutral[100]}
      />
    </TouchableOpacity>
  </View>
);

const PageHeader: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Matches</Text>
  </View>
);

const Match = () => {
  const { matches, fetchMatches } = useMatches();
  const { search, setSearch, filteredMatches } = useSearch(matches);
  const { copyToClipboard } = useClipboard();

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleCopyDiscord = (discordName: string) => {
    copyToClipboard(discordName);
  };

  const renderMatchItem = ({ item }: { item: IMatch }) => (
    <MatchItem match={item} onCopyDiscord={handleCopyDiscord} />
  );

  const keyExtractor = (match: IMatch) => match.id.toString();

  const emptyMessage = search ? 'No matches found for your search' : 'No matches found';

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader />
      <SearchHeader searchValue={search} onSearchChange={setSearch} />
      <FlatList
        data={filteredMatches}
        keyExtractor={keyExtractor}
        renderItem={renderMatchItem}
        ListEmptyComponent={<EmptyState message={emptyMessage} />}
        showsVerticalScrollIndicator={false}
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
    color: theme.colors.neutral[100],
    textAlign: 'center',
    marginTop: 32
  },
  match: {
    width: '100%',
    backgroundColor: theme.colors.neutral[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: MATCH_BORDER_RADIUS,
    marginBottom: 12
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: MATCH_BORDER_RADIUS
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
    borderRadius: DISCORD_BUTTON_RADIUS,
    backgroundColor: theme.colors.primary[400]
  },
  text: {
    fontSize: 14,
    color: theme.colors.neutral[100]
  }
});

export default Match;