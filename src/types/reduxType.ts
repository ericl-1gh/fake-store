export interface IProfileDetails {
  name?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  uid?: string | null;
}
export interface IRootReduxState {
  userDetails: {
    isLogin: string;
    profileDetails: IProfileDetails;
    themeMode: string;
  };
}
