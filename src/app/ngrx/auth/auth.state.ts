export interface AuthState {
  idToken: string;

  isGettingAccessToken: boolean;
  getAccessTokenSuccess: boolean;
  getAccessTokenErrorMessage: string;

  isLoginLoading: boolean;
  isLoginSuccess: boolean;
  loginErrorMessage: string;

  isLogoutLoading: boolean;
  isLogoutSuccess: boolean;
  logoutErrorMessage: string;
}
