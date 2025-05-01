import {Colors, responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';
import {textStyle} from '../../resources/CommonStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Colors.screenBackground,
  },
  child: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  subContainer: {
    // This ensures it takes up the remaining space
    justifyContent: 'flex-end', // Align content to the bottom
    alignItems: 'center', // Center horizontally
    paddingBottom: 20,
    alignSelf: 'flex-end',
    //backgroundColor: Colors.screenBackground,
    width: responsiveWidth(100),
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    elevation: 10,
    shadowColor: Colors.black,
  },
  titleViewContainer: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
  },
  btnContainer: {
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    marginTop: responsiveHeight(2),
    //backgroundColor: Colors.screenBackground,

    borderRadius: responsiveHeight(1),
    overflow: 'hidden',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 0.8,
  },
  logoImage: {
    marginTop: responsiveHeight(30),
    height: responsiveHeight(25),
    resizeMode: 'contain',
  },
  btnTextStyle: {
    marginLeft: responsiveWidth(4),
    ...textStyle(16, 'Roboto200', 'center'),
  },
  btnImageStyle: {
    width: responsiveWidth(8),
    height: responsiveHeight(8),
    resizeMode: 'contain',
  },
  policyView: {
    width: responsiveWidth(90),
    marginVertical: responsiveHeight(2.5),
  },
  policyTextStyle: {
    marginTop: responsiveHeight(2),
    ...textStyle(15, 'Roboto', 'center'),
  },
  onPressTermspolicyView: {flexDirection: 'row', justifyContent: 'center'},
  bottomBtn: {
    ...textStyle(12.5, 'Roboto200', 'right'),
    marginHorizontal: responsiveWidth(1),
  },
  andTextStyle: {
    marginLeft: responsiveWidth(1),
  },
  profileContaier: {
    position: 'absolute',
    bottom: 0,
    width: responsiveWidth(100),
    // height: responsiveHeight(45),
    paddingVertical: responsiveHeight(2),
    //backgroundColor: Colors.offWhite,

    borderTopLeftRadius: responsiveWidth(5),
    //borderTopEndRadius: 5,
    borderTopRightRadius: responsiveWidth(5),
  },
  profileTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(95),
    alignSelf: 'center',
  },
  profileClosebtn: {
    flexDirection: 'row',

    paddingLeft: responsiveWidth(1.5),
  },
  profileCloseIcon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
  },
  contactNameTextInput: {
    marginTop: 10,
    height: responsiveHeight(5.5),
    borderRadius: 5,
    borderColor: Colors.blue,
  },
  profileViewModel: {
    alignItems: 'center',
  },
  rightIcons: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    // tintColor: colors.blue,
  },
  labelView: {
    // position: 'relative',
    // marginLeft: responsiveWidth(0.5),
    width: responsiveWidth(88),
  },
  forgotTextStyle: {
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(1),
    ...textStyle(14, 'Roboto200', 'right'),
  },
  forgotTextView: {width: responsiveWidth(95)},
  btmTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
  },
  bottonBtn: {
    ...textStyle(14, 'Roboto200', 'right'),
    marginLeft: responsiveWidth(1.5),
  },
  opacityView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay with 50% opacity
    zIndex: 1,
  },
});

export {styles};
