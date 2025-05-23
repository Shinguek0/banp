import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import {
  FullMetadata,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';

type FirebaseUpload = {
  uri: string;
  name?: string;
  onProgress?: Function;
};

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

auth.useDeviceLanguage();

const uploadToFirebase = async ({
  uri,
  name,
  onProgress
}: FirebaseUpload): Promise<{ downloadUrl: string; metadata: FullMetadata }> => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(storage, `photos/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata
        });
      }
    );
  });
};

export { app, auth, getApp, getAuth, storage, uploadToFirebase };
