import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SplashScreen } from '@screen';
import { RootStackParamList } from '@types';
import { BottomTabNavigator } from 'navigator/BottomTabNavigator';
import { CategoryScreen } from 'screens/CategoryScreen';
import ProductScreen from 'screens/ProductScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Group screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="HomeBottom" component={BottomTabNavigator} />
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="CategoryScreen" component={CategoryScreen} />
      <RootStack.Screen name="BottomTabBar" component={BottomTabNavigator} />
      <RootStack.Screen name="ProductScreen" component={ProductScreen} />
    </RootStack.Group>
  );
};

export { RootStackNavigator };
