import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileModal = ({ visible, onClose, onConfirm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleConfirm = () => {
    let hasError = false;

    if (!username.trim()) {
      setUsernameError('Username cannot be empty');
      hasError = true;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password cannot be empty');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!hasError) {
      onConfirm(username, password);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Profile</Text>

          <View style={styles.form}>
            <Text style={styles.label}>New User Name</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={text => {
                setUsername(text);
                if (text.trim()) setUsernameError('');
              }}
              placeholder="Enter username"
              placeholderTextColor="#999"
            />
            {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (text.trim()) setPasswordError('');
              }}
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry
            />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Icon name="checkmark" size={18} color="white" />
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {onClose();
                setPassword('');
                setUsername('');
            }}>
              <Icon name="close" size={18} color="white" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    backgroundColor: '#41A9E4',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    padding: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  form: {
    backgroundColor: '#6B5FCF',
    width: '90%',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  label: {
    color: '#D0CFFF',
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#D9D6FB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 2,
  },
  cancelButton: {
    backgroundColor: '#1C6DD0',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  error: {
    color: '#FFCDD2',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  
});
