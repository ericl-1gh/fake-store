import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: {title: string};
  SplashScreen: undefined;
  BottomTabBar: undefined;
  CategoryScreen: undefined;
  WebViewScreen: undefined;
  ProductScreen: undefined;
};
export type BottomTabBarParamList = {
  HomeScreen: undefined;
  SettingScreen: undefined;
};
export type LoginScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

export type SplashScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

export type HomeScreenNavigatorProps = NativeStackNavigationProp<
  BottomTabBarParamList,
  'HomeScreen'
>;

export type CategoryScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'CategoryScreen'
>;

export type ProductScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'ProductScreen'
>;
