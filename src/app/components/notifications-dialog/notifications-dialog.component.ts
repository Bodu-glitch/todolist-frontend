import {Component} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-notifications-dialog',
  imports: [MaterialModule],
  templateUrl: './notifications-dialog.component.html',
  standalone: true,
  styleUrl: './notifications-dialog.component.scss'
})
export class NotificationsDialogComponent {
  notifications = [
    {
      "avatar": "A",
      "title": "Nguyen Dang Gia Tuong",
      "description": "Nguyen Dang Gia Tuong had joined your workspace"
    },
    {
      "avatar": "A",
      "title": "Tra My sent you a message",
      "description": "Alo"
    },
    {
      "avatar": "A",
      "title": "ListState item",
      "description": "Supporting line text lorem ipsum dolor sit amet, consectetur."
    },
    {
      "avatar": "A",
      "title": "ListState item",
      "description": "Supporting line text lorem ipsum dolor sit amet, consectetur."
    },
    {
      "avatar": "A",
      "title": "ListState item",
      "description": "Supporting line text lorem ipsum dolor sit amet, consectetur."
    }
  ];
}
