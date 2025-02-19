import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DragDropComponent} from './components/drag-drop/drag-drop.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {DrawerComponent} from './components/drawer/drawer.component';
import {NotificationsDrawerComponent} from './components/notifications-drawer/notifications-drawer.component';
import {MaterialModule} from './shared/modules/material.module';
import {SearchDrawerComponent} from './components/search-drawer/search-drawer.component';
import {DrawerService} from './services/drawer.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropComponent, FullCalendarModule, DrawerComponent, NotificationsDrawerComponent, MaterialModule, SearchDrawerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'untitled1';

  constructor(private drawerService: DrawerService) {
  }

  toggleNotificationsDrawer() {
    this.drawerService.toggleNotifications();
    Object.assign(this, {NotificationsDrawerComponent});
  }

  toggleSearchDrawer() {
    this.drawerService.toggleSearch();
  }
}
