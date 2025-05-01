import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {styles} from './style';

import {ImageKeys, IProfileDetails, LoginScreenNavigatorProps} from '@types';
// import {changeLanguage, localize} from '@languages';
import {Colors, textStyle} from '@resources';

import {images} from '@assets';
import {FirebaseAuth} from '@services';

import {useDispatch} from 'react-redux';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {isUserLogin, profileDetails} from '@actions';
import {CommonActions, useNavigation, useTheme} from '@react-navigation/native';
import {CommonButton, CommonModal, InputBox, Loader} from '@components';
import {useStateWithCallback} from '@hooks';

import {localize} from '@languages';

interface Props extends LoginScreenNavigatorProps {}

const LoginScreen = () => {
  const colors = useTheme().colors;
  const theme = useColorScheme();

  const common_obj = {
    value: '',
    isError: '',
  };
  let main_obj = {
    name: common_obj,
    email: common_obj,
    password: common_obj,
    confirmPassword: common_obj,
    // forgot_password: common_obj,
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const ass = useSelector((state: IRootReduxState) => state.userDetails);

  const [isModalOpen, setIsModalOpen] = useState<string>('');
  const [input, setInputs] = useStateWithCallback(main_obj);

  const [isSecureText, setIsSecureText] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);
  const inputRef5 = useRef<TextInput>(null);
  const inputRef6 = useRef<TextInput>(null);
  const inputRef7 = useRef<TextInput>(null);

  useEffect(() => {
    FirebaseAuth.googleConfigure();
  }, []);

  const checkSignInValidation = (item: number) => {
    return new Promise((resolve, reject) => {
      let state_object = {...input};

      switch (item) {
        case 1:
          if (input.password?.value === '') {
            state_object.password = {
              ...state_object.password,
              isError: localize('please_enter_password'),
            };
            inputRef2.current?.focus();
            reject();
          }
        // eslint-disable-next-line no-fallthrough
        case 0:
          if (input.email?.value === '') {
            state_object.email = {
              ...state_object.email,
              isError: localize('please_enter_email'),
            };
            inputRef.current?.focus();
            reject();
          }

        // eslint-disable-next-line no-fallthrough
        default:
          setInputs(state_object, () => resolve(state_object));
      }
    });
  };

  const checkSignUpValidation = (item: number) => {
    return new Promise((resolve, reject) => {
      let state_object = {...input};

      switch (item) {
        case 4:
          if (input.confirmPassword?.value === '') {
            state_object.confirmPassword = {
              ...state_object.confirmPassword,
              isError: localize('please_enter_confirm_password'),
            };
            inputRef6.current?.focus();
            reject();
          } else if (input.confirmPassword?.value !== input.password?.value) {
            state_object.confirmPassword = {
              ...state_object.confirmPassword,
              isError: localize('password_not_match'),
            };

            inputRef6.current?.focus();
            reject();
          }

        // eslint-disable-next-line no-fallthrough
        case 3:
          if (input.password?.value === '') {
            state_object.password = {
              ...state_object.password,
              isError: localize('please_enter_password'),
            };
            inputRef5.current?.focus();
            reject();
          }

        // eslint-disable-next-line no-fallthrough
        case 1:
          if (input.email?.value === '') {
            state_object.email = {
              ...state_object.email,
              isError: localize('please_enter_email'),
            };
            inputRef4.current?.focus();
            reject();
          }
        // eslint-disable-next-line no-fallthrough
        case 0:
          if (input.name?.value === '') {
            state_object.name = {
              ...state_object.name,
              isError: localize('please_enter_name'),
            };
            inputRef3.current?.focus();
            reject();
          }
        // eslint-disable-next-line no-fallthrough
        default:
          setInputs(state_object, () => resolve(state_object));
          break;
      }
    });
  };
  //Google signin
  const onSubmitLogin = async () => {
    try {
      const details = await FirebaseAuth.googleSignIn();
      setIsLoading(true);

      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTabBar'}],
          }),
        );
        setIsLoading(false);
      }, 2000);

      dispatch(profileDetails(details));
      dispatch(isUserLogin(true));
    } catch (error) {
      setIsLoading(false);
    }
  };
  //Email/password signin
  const onSubmitSignIn = async () => {
    try {
      setIsLoad(true);
      const {email, password} = await checkSignInValidation(1);

      if (!email.isError && !password.isError) {
        const response = await FirebaseAuth.emailWithSignIn(
          email.value,
          password.value,
        );

        const {
          email: FirebaseEmail,
          photoURL,
          displayName,
          uid,
        } = response.user;
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTabBar'}],
          }),
        );

        let details: IProfileDetails = {
          name: displayName,
          email: FirebaseEmail,
          uid: uid,
          photoUrl: photoURL,
        };
        dispatch(profileDetails(details));
        dispatch(isUserLogin(true));
        setIsLoad(false);
        console.log('Login Success', response.user, response.user.uid);
      }
    } catch (error) {
      console.log('check is error>>>', error);
      setIsLoad(false);
    }
  };
  //Email/password signUp
  const onSubmitSignUp = async () => {
    try {
      setIsLoad(true);
      const {email, password, name, confirmPassword} =
        await checkSignUpValidation(4);

      if (
        !name.isError &&
        !email.isError &&
        !password.isError &&
        !confirmPassword.isError
      ) {
        const response = await FirebaseAuth.emailWithSignUp(
          email.value,
          password.value,
        );

        const {
          email: FirebaseEmail,
          photoURL,
          displayName,
          uid,
        } = response.user;
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTabBar'}],
          }),
        );

        let details: IProfileDetails = {
          name: displayName ? displayName : name.value,
          email: FirebaseEmail,
          uid: uid,
          photoUrl: photoURL,
        };
        dispatch(profileDetails(details));
        dispatch(isUserLogin(true));
      }

      setIsLoad(false);
    } catch (error) {
      console.log('check SignUp error>>>', error);
      setIsLoad(false);
    }
  };
  //Email/password forgot password link generator
  const onGetForgotPassword = async () => {
    const {email} = input;
    console.log('has value is >>>>>', isModalOpen, email.value);
    setIsLoad(true);
    if (email.value.trim()) {
      await FirebaseAuth.sendPasswordLink(email.value);
      setIsLoad(false);
    } else {
      setIsLoad(false);
      setInputs(
        {
          ...input,
          email: {
            ...input.email,
            isError: 'Please enter your email',
          },
        },
        () => {
          inputRef7.current?.focus();
        },
      );
    }
  };

  //Apple login
  // const onPressAppleLogin = async () => {
  //   try {
  //     console.log('check apple auth >>>>', appleAuthAndroid.isSupported);
  //     // Apple authentication requires API 19+, so we check before showing the login button
  //     const response = await FirebaseAuth.appleLogin();

  //     console.log('Apple login response >>>>.', response);
  //   } catch (error) {
  //     console.error('Apple Sign-In error:', error);
  //   }
  // };

  const yahooLogin = async () => {
    // try {
    //   const response = await FirebaseAuth.doLoginWithYahoo();
    //   console.log('LoginWithYahoo login response >>>>.', response);
    // } catch (error) {
    //   console.error('Yahoo sign-in error:', error);
    // }
  };

  const _renderLabelText = (label: string = '') => {
    return (
      <View style={styles.labelView}>
        <Text style={[textStyle(12, 'Roboto', 'left'), {color: Colors.red}]}>
          {label}
        </Text>
      </View>
    );
  };
  const _renderTextInput = (
    label: string,
    state: string,
    icons: ImageKeys,
    ref: any,
    keyboardType: KeyboardTypeOptions = 'default',
    isShow: boolean = false,
    // isConfirmPassword: boolean = false,
  ) => {
    const rightIcon = isShow ? (
      <PaperTextInput.Icon
        onPress={() => {
          setIsSecureText(!isSecureText);
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => {
          return (
            <Image
              source={images[isSecureText ? 'ic_hideEye' : 'ic_openEye']}
              style={[styles.rightIcons, {tintColor: colors.DarkSlateBlue}]}
            />
          );
        }}
        forceTextInputFocus={false}
      />
    ) : null;

    return (
      <>
        <InputBox
          refs={ref}
          label={label}
          blurOnSubmit={true}
          keyboardType={keyboardType}
          value={input[state].value}
          onChangeText={text => {
            setInputs({
              ...input,
              [state]: {value: text, isError: false},
            });
          }}
          {...(input[state] == input.password && {
            secureTextEntry: isSecureText,
          })}
          left={
            <PaperTextInput.Icon
              // eslint-disable-next-line react/no-unstable-nested-components
              icon={() => {
                return (
                  <Image
                    source={images[icons]}
                    style={[
                      styles.rightIcons,
                      {tintColor: colors.DarkSlateBlue},
                    ]}
                  />
                );
              }}
            />
          }
          right={rightIcon}
          textinputStyle={styles.contactNameTextInput}
          outlineStyle={{
            borderColor: input[state].isError
              ? Colors.red
              : Colors.DarkSlateBlue,
          }}
          onSubmitEditing={() => {
            console.log('on Submit Done');
          }}
          textColor={colors.text}
          theme={{
            colors: {
              onSurfaceVariant: colors.DarkSlateBlue,
              primary: input[state].isError ? Colors.red : colors.DarkSlateBlue,
            },
          }}
        />
        {input[state].isError &&
          _renderLabelText(input[state].isError ? input[state].isError : '')}
      </>
    );
  };

  const _renderTitleView = (label: string = '') => {
    return (
      <View style={styles.profileTitleView}>
        <Text style={[textStyle(20, 'Roboto200'), {color: colors.text}]}>
          {label}
        </Text>
        <Pressable
          style={styles.profileClosebtn}
          onPress={() => {
            setIsModalOpen('');
          }}>
          <Image
            source={images.ic_close}
            style={[styles.profileCloseIcon]}
            tintColor={colors.icons}
          />
        </Pressable>
      </View>
    );
  };

  const _renderCommonModel = () => {
    switch (isModalOpen) {
      case 'EmailLogin':
        return (
          <CommonModal
            onClose={() => {}}
            isVisible={isModalOpen === 'EmailLogin'}>
            <View
              style={[styles.profileContaier, {backgroundColor: colors.card}]}>
              {_renderTitleView('Sign In')}

              <View style={styles.profileViewModel}>
                {_renderTextInput(
                  localize('enter_name'),
                  'email',
                  'ic_email',
                  inputRef,
                )}
                {_renderTextInput(
                  localize('enter_password'),
                  'password',
                  'ic_password',
                  inputRef2,
                  'default',
                  true,
                )}
              </View>
              <View style={styles.forgotTextView}>
                <Text
                  onPress={() => {
                    setIsModalOpen('ForgotPassword');
                    setInputs(main_obj);
                  }}
                  style={[
                    styles.forgotTextStyle,
                    {color: colors.DarkSlateBlue},
                  ]}>
                  {localize('forgot_password')}
                </Text>
              </View>
              <CommonButton
                buttonStyle={{marginTop: 20}}
                title={localize('done')}
                onPress={() => {
                  onSubmitSignIn();
                }}
                isLoading={isLoad}
              />
              <View style={[styles.btmTextView]}>
                <Text
                  style={[
                    textStyle(14, 'Roboto', 'right'),
                    {color: colors.text},
                  ]}>
                  {localize('donot_have_account')}
                </Text>
                <Text
                  onPress={() => {
                    setInputs(main_obj);
                    setIsModalOpen('EmailSignUp');
                    setIsLoad(false);
                  }}
                  style={[styles.bottonBtn, {color: colors.DarkSlateBlue}]}>
                  {localize('signUp')}
                </Text>
              </View>
            </View>
          </CommonModal>
        );

      case 'EmailSignUp':
        return (
          <CommonModal
            onClose={() => {}}
            isVisible={isModalOpen === 'EmailSignUp'}>
            <View
              style={[styles.profileContaier, {backgroundColor: colors.card}]}>
              {_renderTitleView('Create Account')}

              <View style={styles.profileViewModel}>
                {_renderTextInput(
                  localize('enter_name'),
                  'name',
                  'ic_profile',
                  inputRef3,
                )}
                {_renderTextInput(
                  localize('enter_email'),
                  'email',
                  'ic_email',
                  inputRef4,
                )}
                {_renderTextInput(
                  localize('enter_password'),
                  'password',
                  'ic_password',
                  inputRef5,
                  'default',
                  true,
                )}
                {_renderTextInput(
                  localize('re_enter_password'),
                  'confirmPassword',
                  'ic_password',
                  inputRef6,
                )}
              </View>
              <CommonButton
                buttonStyle={{marginTop: 20}}
                title={localize('done')}
                onPress={() => {
                  onSubmitSignUp();
                }}
                isLoading={isLoad}
              />
              <View style={[styles.btmTextView]}>
                <Text
                  style={[
                    textStyle(14, 'Roboto', 'right'),
                    {color: colors.text},
                  ]}>
                  {localize('already_have_account')}
                </Text>
                <Text
                  onPress={() => {
                    setIsModalOpen('EmailLogin');
                    setInputs(main_obj);
                    setIsLoad(false);
                  }}
                  style={[styles.bottonBtn, {color: colors.DarkSlateBlue}]}>
                  {localize('signIn')}
                </Text>
              </View>
            </View>
          </CommonModal>
        );
      case 'ForgotPassword':
        return (
          <CommonModal isVisible={isModalOpen === 'ForgotPassword'}>
            <View
              style={[styles.profileContaier, {backgroundColor: colors.card}]}>
              {_renderTitleView('Forgot Password')}

              <View style={styles.profileViewModel}>
                {_renderTextInput(
                  localize('enter_email'),
                  'email',
                  'ic_email',
                  inputRef7,
                )}
              </View>
              <View style={styles.forgotTextView}>
                <Text
                  onPress={() => {
                    setIsModalOpen('EmailLogin');
                    setInputs(main_obj);
                    setIsLoad(false);
                  }}
                  style={[
                    styles.forgotTextStyle,
                    {color: colors.DarkSlateBlue},
                  ]}>
                  {localize('signIn')}
                </Text>
              </View>
              <CommonButton
                buttonStyle={{marginTop: 20}}
                title={localize('done')}
                isLoading={isLoad}
                onPress={() => {
                  onGetForgotPassword();
                }}
              />
            </View>
          </CommonModal>
        );
    }
  };

  const loginBtn = (icons: ImageKeys, onPress: () => void) => {
    return (
      <Pressable
        style={[
          styles.btnContainer,
          {
            backgroundColor: colors.background,
            ...(theme !== 'dark' ? {borderColor: colors.black} : {}),
          },
        ]}
        onPress={onPress}>
        <Image source={images[icons]} style={styles.btnImageStyle} />
      </Pressable>
    );
  };
  const {height} = Dimensions.get('window');
  return (
    <>
      {isModalOpen && (
        <Pressable
          style={[
            styles.opacityView,
            {backgroundColor: colors.blackTransparency},
          ]}
          onPress={() => {}}
        />
      )}
      <ScrollView scrollEnabled={false}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <View
            style={[
              styles.child,
              {height: height * 0.7, backgroundColor: colors.background},
            ]}>
            <Image
              source={images.ic_atharvaLogo}
              tintColor={Colors.black}
              style={[styles.logoImage]}
            />
          </View>
          <View style={[styles.subContainer, {backgroundColor: colors.card}]}>
            <View style={styles.titleViewContainer}>
              <Text
                style={[
                  textStyle(20, 'Roboto200', 'center'),
                  {color: colors.text},
                ]}>
                {localize('wel_come')}
              </Text>
              <Text
                style={[
                  textStyle(14, 'Roboto', 'center'),
                  {color: colors.secondaryText},
                ]}>
                {localize('sub_welCome')}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              {loginBtn('ic_google', async () => onSubmitLogin())}
              {loginBtn('ic_email', () => {
                setIsModalOpen('EmailLogin');
              })}
              {/* {loginBtn('ic_apple', () => {
                onPressAppleLogin();
              })} */}
              {/* {loginBtn('ic_yahoo', () => yahooLogin())} */}
            </View>

            <View style={styles.policyView}>
              <Text
                style={[
                  textStyle(13, 'Roboto200', 'center'),
                  {color: colors.text},
                ]}>
                {localize('accept_agree')}
              </Text>
              <View style={styles.onPressTermspolicyView}>
                <Text
                  onPress={async () => {
                    navigation.navigate('WebViewScreen', {
                      title: localize('policy_title'),
                    });
                  }}
                  style={[styles.bottomBtn, {color: colors.DarkSlateBlue}]}>
                  {localize('policy_title')}
                </Text>
                <Text
                  style={[
                    textStyle(12, 'Roboto200', 'center'),
                    {color: colors.text},
                  ]}>
                  {'&'}
                </Text>
                <Text
                  onPress={() => {
                    navigation.navigate('WebViewScreen', {
                      title: localize('term_title'),
                    });
                  }}
                  style={[styles.bottomBtn, {color: colors.DarkSlateBlue}]}>
                  {localize('term_title')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Loader isLoading={isLoading} />
      {_renderCommonModel()}
    </>
  );
};

export {LoginScreen};
