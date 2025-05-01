import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {Colors, responsiveWidth} from '@resources';
import {responsiveHeight} from '../resources/helpers';
import {images} from '@assets';

interface Props {
  viewStyle?: StyleProp<ViewStyle>;
  isLoading: boolean;
  backgroundColor?: string;
  isDefaultLoader?: boolean;
}
class Loader extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      viewStyle = styles.modalBackground,
      isLoading = false,
      backgroundColor = Colors.blackTransparency,
      isDefaultLoader = false,
    } = this.props;

    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}
        onRequestClose={() => {}}>
        <View style={[viewStyle, {backgroundColor}]}>
          <View style={[styles.activityIndicatorWrapper]}>
            {isDefaultLoader ? (
              <ActivityIndicator size={'large'} color={Colors.black} />
            ) : (
              <LottieView
                source={images.Animation_Default_1}
                style={{
                  width: responsiveWidth(25),
                  height: responsiveHeight(15),
                }}
                autoPlay
                loop
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

export {Loader};
export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
