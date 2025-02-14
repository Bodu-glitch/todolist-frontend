import {Component} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-share-dialog',
  imports: [MaterialModule],
  templateUrl: './share-dialog.component.html',
  standalone: true,
  styleUrl: './share-dialog.component.scss'
})
export class ShareDialogComponent {

}
