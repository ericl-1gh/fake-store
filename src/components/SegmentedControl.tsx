import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
};

// So that it stretches in landscape mode.
const width = Dimensions.get('screen').width - 32;

const SegmentedControl = ({
  tabs = [],
  onChange = () => {},
  currentIndex = 0,
  segmentedControlBackgroundColor = '#E5E5EA',
  activeSegmentBackgroundColor = 'white',
  textColor = 'black',
  activeTextColor = 'black',
}) => {
  const translateValue = (width - 4) / tabs.length;
  const [tabTranslate, setTabTranslate] = React.useState(new Animated.Value(0));

  const memoizedTabPressCallback = React.useCallback(index => {
    onChange(index);
  }, []);

  useEffect(() => {
    Animated.spring(tabTranslate, {
      toValue: currentIndex * translateValue,
      stiffness: 180,
      damping: 30,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <Animated.View
      style={[
        styles.segmentedControlWrapper,
        {
          backgroundColor: segmentedControlBackgroundColor,
          paddingVertical: 4,
        },
      ]}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFill,
            position: 'absolute',
            width: (width - 4) / tabs.length,
            top: 0,
            marginVertical: 2,
            marginHorizontal: 2,
            backgroundColor: activeSegmentBackgroundColor,
            borderRadius: 8,
            ...shadow,
          },
          {
            transform: [
              {
                translateX: tabTranslate,
              },
            ],
          },
        ]}
      />
      {tabs.map((tab, index) => {
        const isCurrentIndex = currentIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.textWrapper]}
            onPress={() => memoizedTabPressCallback(index)}
            activeOpacity={0.7}>
            <Text
              numberOfLines={1}
              style={[
                styles.textStyles,
                {color: textColor},
                isCurrentIndex && {color: activeTextColor},
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  segmentedControlWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    width: width,
    // marginVertical: 10,
  },
  textWrapper: {
    flex: 1,
    elevation: 9,
    paddingHorizontal: 5,
  },
  textStyles: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export {SegmentedControl};
