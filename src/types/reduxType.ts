export interface IProfileDetails {
  name: string;
  email: string;
  token: string;
}
export interface IRootReduxState {
  userDetails: {
    isLogin: string;
    profileDetails: IProfileDetails;
    themeMode: string;
  };
}
