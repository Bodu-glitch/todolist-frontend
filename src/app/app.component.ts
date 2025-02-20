import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DragDropComponent} from './components/drag-drop/drag-drop.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {DrawerComponent} from './components/drawer/drawer.component';
import {NotificationsDrawerComponent} from './components/notifications-drawer/notifications-drawer.component';
import {MaterialModule} from './shared/modules/material.module';
import {SearchDrawerComponent} from './components/search-drawer/search-drawer.component';
import {DrawerService} from './services/drawer.service';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/auth/auth.state';
import * as authActions from './ngrx/auth/auth.actions';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropComponent, FullCalendarModule, DrawerComponent, NotificationsDrawerComponent, MaterialModule, SearchDrawerComponent, NgStyle],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'untitled1';
  isSearchOpen = false;

  toggleNotificationsDrawer() {
    this.drawerService.toggleNotifications();
    Object.assign(this, {NotificationsDrawerComponent});
  }

  toggleSearchDrawer() {
    console.log('toggleSearchDrawer');
    this.isSearchOpen = !this.isSearchOpen;
    this.drawerService.toggleSearch();
  }

  constructor(private drawerService: DrawerService,
              private googleAuth: Auth,
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
