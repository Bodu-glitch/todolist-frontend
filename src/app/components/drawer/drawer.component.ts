import {Component, EventEmitter, Output} from '@angular/core';
import {DrawerService} from '../../services/drawer.service';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-drawer',
  imports: [MaterialModule],
  templateUrl: './drawer.component.html',
  standalone: true,
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  constructor(private drawerService: DrawerService) {
  }

  boards = [
    {
      name: 'Work',
      background: '../../../assets/images/background1.jpg',
    },
    {
      name: 'Personal',
      background: 'url(https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg)',
    },
  ];

  @Output() toggleNotifications = new EventEmitter<void>();
  @Output() toggleSearch = new EventEmitter<void>();

  openNotificationsDrawer() {
    this.toggleNotifications.emit();
  }

  openSearchDrawer() {
    this.toggleSearch.emit();
  }
}
