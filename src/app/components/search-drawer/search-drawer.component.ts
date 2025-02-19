import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DrawerService} from '../../services/drawer.service';
import {MaterialModule} from '../../shared/modules/material.module';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-search-drawer',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './search-drawer.component.html',
  standalone: true,
  styleUrl: './search-drawer.component.scss'
})
export class SearchDrawerComponent implements AfterViewInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(protected drawerService: DrawerService) {
  }

  ngAfterViewInit() {
    this.drawerService.setSearchDrawer(this.drawer);
  }
}
