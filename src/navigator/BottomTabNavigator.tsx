import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screen from '@screen';
import { BottomTabBarParamList, ImageKeys, ScreenComponents } from '@types';
import {
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { images } from '@assets';
import {
  Colors,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '@resources';
import { isIpad } from '@utils';
import { useTheme } from '@react-navigation/native';
import { localize } from '@languages';

const BottomTab = createBottomTabNavigator<BottomTabBarParamList>();

// const AddScreen = ({
//   name,
//   label,
//   icon,
//   component,
// }: {
//   name: string;
//   label: string;
//   icon: ImageKeys;
//   component: React.ComponentType<any>;
// }) => {
//   const colors = useTheme().colors;
//   return (
//     <BottomTab.Screen
//       name={name}
//       component={component}
//       options={{
//         tabBarLabel: label,

//         tabBarIcon: ({color}) => {
//           return (
//             <Image
//               source={images[icon]}
//               style={{
//                 tintColor: color,
//                 width: responsiveWidth(5),
//                 height: responsiveHeight(5),
//                 resizeMode: 'contain',
//               }}
//             />
//           );
//         },
//       }}
//     />
//   );
// };
const BottomTabNavigator = () => {
  const colors = useTheme().colors;
  const screens: ScreenComponents = {
    HomeScreen: Screen.HomeScreen,
    SettingScreen: Screen.SettingScreen,
  };
  const isDarkMode = useColorScheme();

  const _addScreen = (
    name: keyof ScreenComponents,
    label: string,
    icon: ImageKeys,
  ) => {
    return (
      <BottomTab.Screen
        name={name}
        component={screens[name]}
        options={{
          tabBarLabel: label,
          headerTitle: localize(name),
          tabBarLabelPosition: isIpad() ? 'beside-icon' : 'below-icon',
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={images[icon]}
                style={[
                  {
                    tintColor: focused ? colors.DarkSlateBlue : colors.icons,
                  },
                  styles.imageStyle,
                ]}
              />
            );
          },
        }}
      />
    );
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.DarkSlateBlue,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: responsiveHeight(isIpad() ? 5 : 6.5),
        },
      }}
      initialRouteName="HomeScreen"
    >
      {_addScreen('HomeScreen', 'Home', 'ic_home')}
      {_addScreen('SettingScreen', 'Setting', 'ic_setting')}
    </BottomTab.Navigator>
  );
};

export { BottomTabNavigator };

const styles = StyleSheet.create({
  imageStyle: {
    width: responsiveWidth(5),
    height: responsiveHeight(5),
    resizeMode: 'contain',
    margin: 30,
  },
});
