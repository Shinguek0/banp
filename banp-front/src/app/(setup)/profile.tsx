import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { uploadToFirebase } from '@/services/firebase';

import { Button, Input, Steps } from '@/components';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Picker from 'react-native-picker-select';

import { getData } from 'country-list';

import { Game, Quiz, type Step } from '@/@types';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/axios';
import { formItemStyle } from '@/styles/patterns';
import { theme } from '@/styles/theme';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

type SelectedAnswer = { answer_id: number; question_id: number };

const Profile = () => {
  const [name, setName] = useState('');
  const [discord, setDiscord] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState<Date>();
  const [photo, setPhoto] = useState('');

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'profile',
      icon: 'user'
    },
    {
      id: 'games',
      icon: 'crosshair'
    },
    {
      id: 'quiz',
      icon: 'star'
    }
  ]);
  const [selectedStepId, setSelectedStepId] = useState('profile');
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGames, setGamesSelected] = useState<{ game_id: number }[]>([]);
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);

  const isNextStepDisabled =
    selectedStepId === 'profile'
      ? !name || !country || !birthDate || !gender || !photo
      : selectedStepId === 'games'
        ? selectedGames.length === 0
        : false;

  const isFinishStepDisabled = quiz.length !== selectedAnswers.length;

  const { user } = useAuth();

  // useEffect(() => {
  //   if (!user) return;

  //   setName(user.displayName ?? '');
  // }, [user]);

  useEffect(() => {
    const getGames = async () => {
      const { data } = await api.get('/game');

      setGames(data);
    };

    getGames();
  }, []);

  useEffect(() => {
    const getQuiz = async () => {
      const { data } = await api.get('/match/question');
      setQuiz(data);
    };

    getQuiz();
  }, []);

  const countries = getData();

  const goToNextStep = () => {
    const nextStepIndex = steps.findIndex(({ id }) => id === selectedStepId) + 1;
    const nextStep = steps[nextStepIndex];

    if (nextStep) {
      setSteps((prev) => {
        return prev.map((step) => {
          if (step.id === selectedStepId) return { ...step, isCompleted: true };
          return step;
        });
      });
      setSelectedStepId(nextStep.id);
    }
  };

  const goToPreviousStep = () => {
    const previousStepIndex = steps.findIndex(({ id }) => id === selectedStepId) - 1;
    const previousStep = steps[previousStepIndex];

    if (previousStep) {
      setSteps((prev) => {
        return prev.map((step) => {
          if (step.id === previousStep.id) return { ...step, isCompleted: false };
          return step;
        });
      });
      setSelectedStepId(previousStep.id);
    }
  };

  const handleChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) setBirthDate(selectedDate);

    setDatePickerOpen(false);
  };

  const handlePickPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const fileName = user.uid;
      const { downloadUrl } = await uploadToFirebase({
        uri,
        name: fileName,
        onProgress: (v: number) => console.log(v)
      });

      setPhoto(downloadUrl);
    }
  };

  const handleAddOrRemoveGames = (gameId: number) => {
    const isGameSelected = selectedGames.some((game) => game.game_id === gameId);

    if (isGameSelected) {
      return setGamesSelected((prev) => prev.filter((game) => game.game_id !== gameId));
    }

    return setGamesSelected((prev) => [...prev, { game_id: gameId }]);
  };

  const handleAnswerPress = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => {
      const isAnswerSelected = prev.some((selectedAnswer) => selectedAnswer.answer_id === answerId);

      if (isAnswerSelected) {
        return prev.filter((selectedAnswer) => selectedAnswer.answer_id !== answerId);
      }

      const isQuestionAnswered = prev.some((selectedAnswer) => selectedAnswer.question_id === questionId);

      if (isQuestionAnswered) {
        return prev.map((selectedAnswer) => {
          if (selectedAnswer.question_id === questionId) {
            return { ...selectedAnswer, answer_id: answerId };
          }
          return selectedAnswer;
        });
      }

      return [...prev, { answer_id: answerId, question_id: questionId }];
    });
  };

  const handleFinishSetup = async () => {
    const setup = {
      name,
      discord,
      email: user.email,
      image: photo,
      gender,
      birth_date: birthDate?.toISOString().split('T')[0],
      games: selectedGames,
      questions: selectedAnswers.map(({ answer_id }) => {
        return { answer_id };
      })
    };

    try {
      const { data } = await api.post(`/user/signup/${user.uid}`, setup);

      if (data) {
        Alert.alert('Success', 'Your profile has been created successfully!');

        router.push('/(banp)/home');
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.container}>
          {isDatePickerOpen && (
            <DateTimePicker
              value={birthDate ?? new Date()}
              mode="date"
              is24Hour={true}
              onChange={handleChangeDate}
              accentColor={theme.colors.primary[500]}
            />
          )}
          <View style={styles.stepContainer}>
            <Steps
              steps={steps}
              selectedStepId={selectedStepId}
            />
          </View>

          {selectedStepId === 'profile' && (
            <View style={styles.tab}>
              <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>Personal basic info, photo and other little things</Text>
              </View>
              <View style={styles.form}>
                <View style={styles.photoUploaderContainer}>
                  <Button.PhotoUploader
                    photo={photo}
                    setPhoto={handlePickPhoto}
                  />
                </View>
                <Input.Text
                  placeholder="Name"
                  icon="user"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <Input.Text
                  placeholder="Discord"
                  customIcon={
                    <FontAwesome6
                      name="discord"
                      size={20}
                      color={theme.colors.neutral[400]}
                    />
                  }
                  value={discord}
                  onChangeText={(text) => setDiscord(text)}
                />
                <View style={styles.formRow}>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setDatePickerOpen(true)}
                  >
                    <Text style={[styles.datePickerButtonText, birthDate ? styles.birthText : {}]}>
                      {birthDate
                        ? birthDate.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
                        : 'Birth Date'}
                    </Text>
                    <Feather
                      name="calendar"
                      size={20}
                      color={theme.colors.neutral[400]}
                    />
                  </TouchableOpacity>
                  <Picker
                    value={gender}
                    placeholder={{
                      label: 'Gender',
                      value: null
                    }}
                    onValueChange={(value) => setGender(value)}
                    items={[
                      {
                        label: 'Male',
                        value: 'M'
                      },
                      {
                        label: 'Female',
                        value: 'F'
                      }
                    ]}
                    Icon={() => (
                      <Feather
                        name="chevron-down"
                        size={24}
                        color={theme.colors.neutral[400]}
                      />
                    )}
                    style={{
                      inputAndroid: {
                        ...styles.picker,
                        minWidth: '40%'
                      },
                      inputIOS: styles.picker,
                      iconContainer: {
                        top: '30%',
                        right: 16
                      },
                      placeholder: {
                        color: theme.colors.neutral[300]
                      }
                    }}
                    useNativeAndroidPickerStyle={false}
                    darkTheme
                  />
                </View>
                <Picker
                  value={country}
                  placeholder={{
                    label: 'Country',
                    value: null
                  }}
                  onValueChange={(value) => setCountry(value)}
                  items={countries.map((country) => {
                    return {
                      label: country.name,
                      value: country.code
                    };
                  })}
                  Icon={() => (
                    <Feather
                      name="chevron-down"
                      size={24}
                      color={theme.colors.neutral[400]}
                    />
                  )}
                  style={{
                    inputAndroid: styles.picker,
                    inputIOS: styles.picker,
                    iconContainer: {
                      top: '30%',
                      right: 16
                    },
                    placeholder: {
                      color: theme.colors.neutral[300]
                    }
                  }}
                  useNativeAndroidPickerStyle={false}
                  darkTheme
                />
              </View>
            </View>
          )}

          {selectedStepId === 'games' && (
            <View style={styles.tab}>
              <View style={styles.header}>
                <Text style={styles.title}>Games</Text>
                <Text style={styles.subtitle}>Select the games you play, this is useful for people to know you. </Text>
              </View>
              <View style={styles.gameList}>
                {games.map(({ id, name }) => (
                  <TouchableOpacity
                    key={id}
                    style={[
                      styles.gameRow,
                      selectedGames.some((game) => game.game_id === id) && {
                        backgroundColor: theme.colors.primary[300]
                      }
                    ]}
                    onPress={() => handleAddOrRemoveGames(id)}
                  >
                    <Text style={styles.gameName}>{name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/*  Cannot use flatlist because of scrollview wrapper (that I use to the buttons not follow the keyboard) - warning VirtualizedList-backed container            
              <FlatList
                data={games}
                keyExtractor={(game) => game.id.toString()}
                style={styles.gameList}
                contentContainerStyle={{ gap: 16 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.gameRow,
                      selectedGames.some((game) => game.gameId === item.id) && {
                        backgroundColor: theme.colors.primary[300]
                      }
                    ]}
                    onPress={() => handleAddOrRemoveGames(item.id)}
                  >
                    <Text style={styles.gameName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              /> */}
            </View>
          )}

          {selectedStepId === 'quiz' && (
            <View style={styles.tab}>
              <View style={styles.header}>
                <Text style={styles.title}>Quiz</Text>
                <Text style={styles.subtitle}>
                  What are your goals? What do you like most when you play? All these questions here.
                </Text>
              </View>
              <View style={styles.quizContainer}>
                {quiz.map((question) => (
                  <View
                    key={question.id}
                    style={styles.quiz}
                  >
                    <Text style={styles.quizTitle}>{question.title}</Text>
                    <View style={styles.quizOptions}>
                      {question.answers.map((answer) => (
                        <TouchableOpacity
                          key={answer.id}
                          style={[
                            styles.quizAnswer,
                            selectedAnswers.some((selectedAnswer) => selectedAnswer.answer_id === answer.id) && {
                              backgroundColor: theme.colors.primary[300]
                            }
                          ]}
                          onPress={() => handleAnswerPress(question.id, answer.id)}
                        >
                          <Text style={styles.quizAnswerText}>{answer.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.actions}>
            {(selectedStepId === 'games' || selectedStepId === 'quiz') && (
              <Button
                onPress={goToPreviousStep}
                shape="rounded"
                type="custom"
                style={styles.backStepButton}
              >
                <Text style={styles.backStepText}>Back</Text>
              </Button>
            )}

            {(selectedStepId === 'profile' || selectedStepId === 'games') && (
              <Button
                onPress={goToNextStep}
                shape="rounded"
                style={[selectedStepId === 'games' && { width: '60%' }]}
                disabled={isNextStepDisabled}
              >
                Next step
              </Button>
            )}

            {selectedStepId === 'quiz' && (
              <Button
                shape="rounded"
                style={{ width: '60%' }}
                disabled={isFinishStepDisabled}
                onPress={handleFinishSetup}
              >
                Finish setup
              </Button>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[600],
    paddingBottom: 64,
    paddingTop: 48,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32
  },
  keyboardView: {
    flex: 1
  },
  tab: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  stepContainer: {
    width: '90%'
  },
  header: {
    gap: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: theme.colors.neutral[100]
  },
  subtitle: {
    color: theme.colors.neutral[200]
  },
  form: {
    flex: 1,
    width: '90%',
    gap: 16,
    marginTop: 16,
    alignItems: 'center'
  },
  photoUploaderContainer: {
    width: '100%',
    alignItems: 'center',
    margin: 12
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  picker: {
    ...formItemStyle,
    minWidth: '100%'
  },
  datePickerButton: {
    ...formItemStyle,
    width: '55%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  datePickerButtonText: {
    color: theme.colors.neutral[300]
  },
  birthText: {
    color: theme.colors.neutral[100]
  },
  gameList: {
    marginVertical: 36,
    gap: 16
  },
  gameRow: {
    flex: 1,
    maxHeight: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[500],
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 4
  },
  gameName: {
    fontSize: 16,
    color: theme.colors.neutral[100]
  },
  quizContainer: {
    flex: 1,
    marginVertical: 36
  },
  quiz: {
    paddingVertical: 16
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.neutral[100]
  },
  quizOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 32
  },
  quizAnswer: {
    backgroundColor: theme.colors.neutral[500],
    padding: 16,
    borderRadius: 4,
    width: '100%'
  },
  quizAnswerText: {
    color: theme.colors.neutral[200]
  },
  actions: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16
  },
  backStepButton: {
    backgroundColor: theme.colors.neutral[500],
    borderRadius: 64,
    width: '40%'
  },
  backStepText: {
    color: theme.colors.neutral[400]
  }
});

export default Profile;
