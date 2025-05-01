import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import { IRootReduxState } from '@types';
import { useSelector } from 'react-redux';

import { textStyle } from '@resources';
import { localize } from '@languages';
import { CommonActions, useNavigation, useTheme } from '@react-navigation/native';
import { FirebaseAuth } from '@services';

const SplashScreen = () => {
  const colors = useTheme().colors;
  const { isLogin } = useSelector((state: IRootReduxState) => state.userDetails);

  const navigation = useNavigation();

  useEffect(() => {
    FirebaseAuth.googleConfigure();

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeBottom' }], // Corrected: Use 'name' instead of just string
        })
      );
    }, 2000);

  }, [navigation, isLogin]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={[textStyle(30, 'Roboto200', 'center'), { color: colors.text }]}>
        {localize('wel_come')}
      </Text>
    </View>
  );
};

export { SplashScreen };
