import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReduxState } from '@types';
import ProfileModal from 'components/ProfileUpdate';
import { performPostRequestServer } from '@actions';
import { endpoints } from '@services';
import { useNavigation } from '@react-navigation/native';
import { reduxTypes } from '@constants';
import { updateIsLogin, updateProfileName } from 'reducers/userDetails';
import { setOrderItems } from 'store/actions/orderActions';
import { setCartItems } from 'store/actions/cartActions';

const SettingScreen = () => {
  const user = useSelector((state: IRootReduxState) => state.userDetails.profileDetails);
  const token = useSelector(state => state.userDetails.profileDetails?.token);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log("user", user);

  const apiCallError = (response) => {
    if (response.message === "Wrong token.") {
      Alert.alert(response.message, "", [{
        text: "Cancel",
        style: 'cancel'
      }, {
        text: "Log in",
        onPress: () => {
          navigation.navigate("LoginScreen")
        }
      }])
    }
  }

  const handleUpdate = () => {
    setIsUpdateModal(true);
  };

  const handleSignOut = () => {
    dispatch(updateIsLogin(false));
    dispatch(setCartItems([]));
    dispatch(setOrderItems([]));
    navigation.navigate("LoginScreen")
  };

  const updateProfile = async (name: string, newPswd: string) => {
    let payload = {
      name: name,
      password: newPswd
    };
    const response = await performPostRequestServer(endpoints.updateOrder, payload, token)();
    if (response.status == "OK") {
      setIsUpdateModal(false);
      dispatch(updateProfileName(name));
      Alert.alert("Updated succesfully")
    } else {
      setIsUpdateModal(false);
      apiCallError(response);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      <ProfileModal visible={isUpdateModal} onConfirm={(name, newPswd) => {
        updateProfile(name, newPswd)

      }} onClose={() => { setIsUpdateModal(false) }} />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>User Name: <Text style={styles.value}>{user.name}</Text></Text>
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

export { SettingScreen };
