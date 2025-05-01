import {reduxTypes} from '@constants';

import {IProfileDetails} from '@types';

// export interface IUserState {
//   isLogin: boolean;
// }

interface IAction {
  type: string;
  isLogin: boolean;
  profileDetails: IProfileDetails;
  themeMode: string;
}

const initialValue = {
  isLogin: false,
  profileDetails: null,
  themeMode: 'Auto',
};
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
    default:
      return state;
  }
};
