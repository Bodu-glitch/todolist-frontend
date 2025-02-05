import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropComponent} from './components/drag-drop/drag-drop.component';
import {FullCalendarModule} from '@fullcalendar/angular';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropComponent,FullCalendarModule ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'untitled1';
}
