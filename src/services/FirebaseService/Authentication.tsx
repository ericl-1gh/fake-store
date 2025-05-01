import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {IProfileDetails} from '@types';
import {Alert} from 'react-native';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import {v4 as uuid} from 'uuid';
class Authentication {
  googleSignIn = async (): Promise<IProfileDetails> => {
    return new Promise(async (resolve, reject) => {
      try {
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();
        const googleCredential = await auth.GoogleAuthProvider.credential(
          userInfo?.data?.idToken,
        );
        console.log('googleCredential', userInfo, googleCredential);
        const response = await auth().signInWithCredential(googleCredential);

        const {user} = response;

        let tempObj: IProfileDetails = {
          name: user?.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
        };
        console.log('response', response);
        return resolve(tempObj);
      } catch (error: any) {
        //  crashlytics().recordError(error);
        if (error && error?.code) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log(error);
            reject(error);
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error);
            reject(error);
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error);
            reject(error);
            // play services not available or outdated
          } else {
            console.log(error);
            reject(error);
            // some other error happened
          }
        }
      }
    });
  };

  emailWithSignIn = (email: string, password: string) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password,
        );

        console.log('sdfsddf', JSON.stringify(response));

        resolve(response);
      } catch (error: any) {
        switch (error.code) {
          case 'auth/password-does':
            this.formatPasswordError(error);
            reject(error);
            break;

          default:
            console.log('Error in emailWithSignIn:', error);

            Alert.alert(
              'Something want to wrong',
              error.message.substring(error.message.indexOf(']') + 1),
            );
            reject(error);
            break;
        }
      }
    });
  };

  emailWithSignUp = (email: string, password: string) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        resolve(response);
      } catch (error: any) {
        switch (error.code) {
          case 'auth/password-does':
            this.formatPasswordError(error);
            reject(error);
            break;

          default:
            console.log('sdfsdfsdf>>>>.', error);
            Alert.alert(
              'Something want to wrong',
              error.message.substring(error.message.indexOf(']') + 1),
            );
            reject(error);
            break;
        }
      }
    });
  };

  sendPasswordLink = async (email: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await auth().sendPasswordResetEmail(email);

        resolve();
      } catch (error: any) {
        console.log('dsfsdfsdf>>>.', error);
        Alert.alert(
          'Something want to wrong',
          error.message.substring(error.message.indexOf(']') + 1),
        );
        reject();
      }
    });
  };
  formatPasswordError = (errorMessage: any) => {
    let errorString = errorMessage.toString();
    const startIndex = errorString.indexOf('Missing password requirements:');
    const endIndex = errorString.lastIndexOf(']');
    let formattedMessage = '';
    if (startIndex !== -1 && endIndex !== -1) {
      // Extract and clean the requirements section
      const requirementsString = errorString
        .substring(
          startIndex + 'Missing password requirements:'.length,
          endIndex,
        )
        .trim();

      // Split the requirements into an array
      const requirementsArray = requirementsString
        .replace(/\[|\]/g, '') // Remove square brackets
        .split(',') // Split by commas
        .map((req: any) => req.trim()); // Trim each requirement

      // Format the requirements into a user-friendly string
      formattedMessage = requirementsArray
        .map((req: any) => `• ${req}`) // Add bullet points
        .join('\n');
    }

    Alert.alert('', `Password requirements not met:\n${formattedMessage}`);
  };
  googleSignout = async () => {
    if (await GoogleSignin.hasPreviousSignIn()) {
      GoogleSignin.configure();

      GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();

      console.log('User signed out successfully.');
    }
  };

  appleLogin = () => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        if (appleAuthAndroid.isSupported) {
          const rawNonce = uuid();
          const state = uuid();
          appleAuthAndroid.configure({
            clientId: 'com.rndemo-v76',
            redirectUri: 'https://rndemo-76.firebaseapp.com/__/auth/handler',
            responseType: appleAuthAndroid.ResponseType.ALL,
            scope: appleAuthAndroid.Scope.ALL,
            nonce: rawNonce,
            state,
          });

          const response = await appleAuthAndroid.signIn();

          if (response.state === state) {
            const AppleAuthAndroid = await auth.AppleAuthProvider.credential(
              response?.id_token,
              response?.nonce,
            );

            let credential = await auth().signInWithCredential(
              AppleAuthAndroid,
            );
            console.log('User signed in with Apple222>>>>', credential);
            resolve(credential);
            console.log('User signed in with Apple222>>>>', credential);
          }
        }
      } catch (error) {
        console.error('Apple Sign-In error:', error);
        reject(error);
      }
    });
  };

  doLoginWithYahoo = async () => {
    try {
      const provider = new auth.OAuthProvider('yahoo.com');

      // Optionally add scopes if needed (e.g., profile, email)
      provider.addScope('profile');
      provider.addScope('email');

      // Optionally add custom parameters
      provider.setCustomParameters({
        prompt: 'login', // This forces the user to log in again
        language: 'en-us', // Optional: Set the language for the sign-in UI
      });

      // Sign-in the user with the Yahoo provider
      // return (
      const respose = await auth().signInWithRedirect(provider);
      console.log('doLoginWithYahoo>>>>', respose);
    } catch (error) {
      console.error('Yahoo sign-in error:', error);
    }
  };
  googleConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '256304395743-qgcaf17aggnfkdd8g6pqsulbo51fvcmt.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  };
}

const FirebaseAuth = new Authentication();

export {FirebaseAuth};
