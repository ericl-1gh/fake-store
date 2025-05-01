import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
type Props = {};

const WebViewScreen = (props: Props) => {
  const route = useRoute();
  return (
    <View style={{flex: 1}}>
      <WebView
        onLoad={() => {}}
        source={{uri: route.params.url}}
        onNavigationStateChange={event => {}}
      />
    </View>
  );
};

export {WebViewScreen};
