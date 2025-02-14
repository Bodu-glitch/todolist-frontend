import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    SidebarComponent
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
