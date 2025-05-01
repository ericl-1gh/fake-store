import {reduxTypes} from '@constants';
import {IProfileDetails} from '@types';

export const isUserLogin = (isLogin: boolean) => {
  return {
    type: reduxTypes.IS_USER_LOGIN,
    isLogin: isLogin,
  };
};
export const profileDetails = (profileDetail: IProfileDetails) => {
  return {
    type: reduxTypes.PROFILE_DATA,
    profileDetails: profileDetail,
  };
};
export const storeThemeMode = (themeMode: string) => {
  return {
    type: reduxTypes.THEME_MODE,
    themeMode: themeMode,
  };
};
