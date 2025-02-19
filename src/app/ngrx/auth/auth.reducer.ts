import {AuthState} from './auth.state';
import {createReducer, on} from '@ngrx/store';
import * as authActions from './auth.actions';

const initialState: AuthState = {
  idToken: '',
  isGettingAccessToken: false,
  getAccessTokenSuccess: false,
  getAccessTokenErrorMessage: '',
  isLoginLoading: false,
  isLoginSuccess: false,
  loginErrorMessage: '',
  isLogoutLoading: false,
  isLogoutSuccess: false,
  logoutErrorMessage: ''
}

export const authReducer = createReducer(
  initialState,
  on(authActions.storeAccessToken, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      idToken: action.accessToken,
    };
  }),
  on(authActions.signInWithGoogle, (state) => {
    return {
      ...state,
      isGettingAccessToken: true,
      getAccessTokenSuccess: false,
      getAccessTokenErrorMessage: ''
    }
  }),
  on(authActions.signInWithGoogleSuccess, (state, {accessToken}) => {
    return {
      ...state,
      idToken: accessToken,
      isGettingAccessToken: false,
      getAccessTokenSuccess: true,
      getAccessTokenErrorMessage: ''
    }
  }),
  on(authActions.signInWithGoogleFailure, (state, {errorMessage}) => {
    return {
      ...state,
      isGettingAccessToken: false,
      getAccessTokenSuccess: false,
      getAccessTokenErrorMessage: errorMessage
    }
  }),
  on(authActions.login, (state, {type, accessToken}) => {
    console.log(type);
    return {
      ...state,
      isLoginLoading: true,
      isLoginSuccess: false,
      loginErrorMessage: ''
    }
  }),
  on(authActions.loginSuccess, (state, type) => {
    console.log(type);
    return {
      ...state,
      isLoginLoading: false,
      isLoginSuccess: true,
      loginErrorMessage: ''
    }
  }),
  on(authActions.loginFailure, (state, {errorMessage}) => {
    return {
      ...state,
      isLoginLoading: false,
      isLoginSuccess: false,
      loginErrorMessage: errorMessage
    }
  }),

  on(authActions.logout, (state) => {
    return {
      ...state,
      isLogoutLoading: true,
      isLogoutSuccess: false,
      logoutErrorMessage: ''
    }
  }),
  on(authActions.logoutSuccess, (state) => {
    return {
      ...state,
      isLogoutLoading: false,
      isLogoutSuccess: true,
      logoutErrorMessage: ''
    }
  }),
  on(authActions.logoutFailure, (state, {errorMessage}) => {
    return {
      ...state,
      isLogoutLoading: false,
      isLogoutSuccess: false,
      logoutErrorMessage: errorMessage
    }
  }),
  on(authActions.clearState, (state) => {
    return initialState;
  })
)
