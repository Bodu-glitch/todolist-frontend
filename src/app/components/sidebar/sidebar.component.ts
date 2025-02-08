import {Component} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userInfo = {
    name: 'Trịnh Tú Hảo',
    email: 'tuhaotrinh@gmail.com ',
    avatar: 'https://avatars.githubusercontent.com/u/47269252?v=4',
  }

  boards = [
    {color: 'grey', name: 'Bảng của tôi'},
    {color: 'blue', name: 'Basic Board'}
  ];
}
