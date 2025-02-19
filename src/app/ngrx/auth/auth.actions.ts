import {createAction, props} from '@ngrx/store';

export const storeAccessToken = createAction('[Auth] Store Access Token', props<{ accessToken: string }>());

export const signInWithGoogle = createAction('[Auth] Sign In With Google');
export const signInWithGoogleSuccess = createAction('[Auth] Sign In With Google Success', props<{
  accessToken: string
}>());
export const signInWithGoogleFailure = createAction('[Auth] Sign In With Google Failure', props<{
  errorMessage: string
}>());

export const login = createAction('[Auth] Login', props<{ accessToken: string }>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure', props<{ errorMessage: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ errorMessage: string }>());

export const clearState = createAction('[Auth] Clear State');
