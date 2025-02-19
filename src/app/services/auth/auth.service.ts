import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, from, of} from 'rxjs';
import {Auth, GoogleAuthProvider, signInWithPopup, signOut} from '@angular/fire/auth';
import * as authActions from '../../ngrx/auth/auth.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private googleAuth: Auth,
              private store: Store<{ auth: AuthState }>) {
  }

  signInWithGoogle() {
    return from(signInWithPopup(this.googleAuth, new GoogleAuthProvider())
      .then(credential => credential.user.getIdToken()));
  }

  login(accessToken: string) {
    return this.httpClient.post('http://localhost:3000/auth/login', {accessToken: accessToken}, {
      headers: {
        'Authorization': accessToken
      }
    });
  }

  logout() {
    return from(signOut(this.googleAuth)).pipe(
      catchError((error) => {
        return of(error);
      }),
    );
  }

}
