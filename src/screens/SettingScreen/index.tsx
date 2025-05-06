import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingScreen = () => {
  const user = {
    username: 'tom',
    email: 'tom@abc.au',
  };

  const handleUpdate = () => {
    // Handle update logic
    alert('Update button pressed');
  };

  const handleSignOut = () => {
    // Handle sign out logic
    alert('Signed out');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>User Name: <Text style={styles.value}>{user.username}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export {SettingScreen};
