import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DrawerService} from '../../services/drawer.service';
import {MaterialModule} from '../../shared/modules/material.module';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-notifications-drawer',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './notifications-drawer.component.html',
  standalone: true,
  styleUrl: './notifications-drawer.component.scss'
})
export class NotificationsDrawerComponent implements AfterViewInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(protected drawerService: DrawerService) {
  }

  ngAfterViewInit() {
    this.drawerService.setNotificationsDrawer(this.drawer);
  }
}
