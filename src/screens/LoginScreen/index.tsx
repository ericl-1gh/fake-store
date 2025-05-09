import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './style';
import { isUserLogin, performGetRequest, performPostRequest, performPostRequestServer, profileDetails } from '@actions';
import { endpoints } from '@services';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@resources';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };


  const handleSubmit = async () => {

    if (isSignUp) {
      try {        
        let userData = { name: username, email: email, password: password };
        const signUpRes = await performPostRequestServer(endpoints.signup, userData)();
        console.log("signUpRes", signUpRes.data);

        if (signUpRes?.status === 'OK') {
          dispatch(profileDetails({
            name: signUpRes.name,
            email: signUpRes.email,
            token: signUpRes.token,
          }));
          setIsSignUp(false);
          Alert.alert("Signed up")
        } else {
          alert(signUpRes?.message || 'Sign up failed');
        }
      } catch (err) {
        console.error(err);
        alert('Sign up error occurred');
      }
    } else {
      // sign-in logic
      try {        
        let userData = { email: email, password: password };
        const signUpRes = await performPostRequestServer(endpoints.signin, userData)();
        console.log("sisss",signUpRes);
        
        if (signUpRes?.status === 'OK') {
          dispatch(isUserLogin(true));
          dispatch(profileDetails({
            name: signUpRes.name,
            email: signUpRes.email,
            token: signUpRes.token,
          }));
          navigation.navigate('HomeBottom');
        } else {
          alert(signUpRes?.message || 'Sign up failed');
        }
      } catch (err) {
        console.error(err);
        alert('Sign up error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.card}
      >
        <Text style={styles.title}>
          {isSignUp ? 'Sign up a new user' : 'Sign in with email and password'}
        </Text>

        {isSignUp && (
          <>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter user name"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={Colors.black}
            />
          </>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={Colors.black}
          />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={Colors.black}
          />


        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Icon name="remove-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Icon name={isSignUp ? 'happy' : 'log-in'} size={20} color="white" />
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchText}>
            Switch to: {isSignUp ? 'sign in with an existing user' : 'sign up a new user'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export { LoginScreen };
