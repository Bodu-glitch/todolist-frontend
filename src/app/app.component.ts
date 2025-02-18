import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DragDropComponent} from './components/drag-drop/drag-drop.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/auth/auth.state';
import * as authActions from './ngrx/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropComponent, FullCalendarModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'untitled1';

  constructor(private googleAuth: Auth,
              private store: Store<{
                auth: AuthState;
              }>) {
  }

  ngOnInit() {
    onAuthStateChanged(this.googleAuth, async (user) => {
      if (user) {
        console.log(user)
        let accessToken = await user.getIdToken();
        console.log(accessToken);
        this.store.dispatch(authActions.storeAccessToken({accessToken: accessToken}));
      } else {
        console.log('User is signed out');
      }
    })
  }

}
