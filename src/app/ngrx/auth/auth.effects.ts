import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import * as authActions from './auth.actions';
import {catchError, map, switchMap, of, from} from 'rxjs';

export const signInWithGoogle$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.signInWithGoogle),
      switchMap(() => {
        return authService.signInWithGoogle().pipe(
          map((accessToken) => authActions.signInWithGoogleSuccess({accessToken})),
          catchError((error) => {
            return of(authActions.signInWithGoogleFailure({errorMessage: error.message}));
          })
        );
      })
    );
  },
  {functional: true}
);

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({accessToken}) => {
        console.log('login effect');
        return authService.login(accessToken).pipe(
          map(() => authActions.loginSuccess()),
          catchError((error) => {
            console.log(error);
            return of(authActions.loginFailure({errorMessage: error.message}));
          })
        );
      })
    );
  },
  {functional: true}
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        return authService.logout().pipe(
          map(() => {
            return authActions.logoutSuccess()
          }),
          catchError((error) => {
            return of(authActions.logoutFailure({errorMessage: error.message}));
          })
        );
      })
    );
  },
  {functional: true}
);
