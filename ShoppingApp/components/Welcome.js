// components/Welcome.js
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { useRouter }               from 'expo-router';
import { auth }                    from '../firebase';
import { signInAnonymously }       from 'firebase/auth';

export default function Welcome() {
  const router = useRouter();

  const handleStart = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      console.log('🔐 Signed in anonymously with UID', user.uid);
      router.push('/shoppinglists');
    } catch (e) {
      console.error('Auth error:', e);
      Alert.alert('Error', 'Could not sign in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Shopping Lists</Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Get started</Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16
  },
  appTitle: {
    fontWeight: '600', fontSize: 45, marginBottom: 100
  },
  startButton: {
    backgroundColor: '#000',
    height: 50,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
