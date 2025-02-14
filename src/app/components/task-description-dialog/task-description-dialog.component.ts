import {Component} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-task-description-dialog',
  imports: [MaterialModule],
  templateUrl: './task-description-dialog.component.html',
  standalone: true,
  styleUrl: './task-description-dialog.component.scss'
})
export class TaskDescriptionDialogComponent {

}
