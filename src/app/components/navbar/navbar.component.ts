import {Component, inject} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {NotificationsDialogComponent} from '../notifications-dialog/notifications-dialog.component';
import {ShareDialogComponent} from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);

  openNotiDialog() {
    const notificationsDialogRef = this.dialog.open(NotificationsDialogComponent);

    notificationsDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openShareDialog() {
    const shareDialogRef = this.dialog.open(ShareDialogComponent);

    shareDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
