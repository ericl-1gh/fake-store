import { reduxTypes } from '@constants';

import { IProfileDetails } from '@types';

// export interface IUserState {
//   isLogin: boolean;
// }

interface IAction {
  type: string;
  isLogin: boolean;
  profileDetails: IProfileDetails;
  themeMode: string;
}

const initialValue: {
  isLogin: boolean;
  profileDetails: IProfileDetails | null;
  // themeMode: string;
} = {
  isLogin: false,
  profileDetails: null,
  // themeMode: 'Auto',
};
export const updateProfileName = (name: string) => ({
  type: reduxTypes.UPDATE_PROFILE_NAME,
  name,
});

export const updateIsLogin = (isLogin: boolean) => ({
  type: reduxTypes.SIGN_OUT,
  isLogin,
});

export const userDetails = (state = initialValue, action: IAction) => {
  switch (action.type) {
    case reduxTypes.IS_USER_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case reduxTypes.PROFILE_DATA:
      return {
        ...state,
        profileDetails: action.profileDetails,
      };
    case reduxTypes.THEME_MODE:
      return {
        ...state,
        themeMode: action.themeMode,
      };
    case reduxTypes.RESET_DATA:
      return initialValue;
    case reduxTypes.UPDATE_PROFILE_NAME:
      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          name: action.name ?? state.profileDetails?.name,
        } as IProfileDetails,
      };
      case reduxTypes.SIGN_OUT:
        return {
          ...state,
          isLogin: action.isLogin
        };

    default:
      return state;
  }
};

