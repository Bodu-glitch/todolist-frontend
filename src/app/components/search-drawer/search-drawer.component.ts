import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DrawerService} from '../../services/drawer.service';
import {MaterialModule} from '../../shared/modules/material.module';
import {RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {BoardService} from '../../services/board/board.service';

@Component({
  selector: 'app-search-drawer',
  imports: [MaterialModule, RouterOutlet, NgStyle, FormsModule, ReactiveFormsModule],
  templateUrl: './search-drawer.component.html',
  standalone: true,
  styleUrl: './search-drawer.component.scss'
})
export class SearchDrawerComponent implements AfterViewInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  @Input() isSearchOpen = false;

  boards: {
    name: string;
    image: string;
  }[] = []
  boardName: string = '';


  constructor(protected drawerService: DrawerService,
              private store: Store<{
                board: BoardState
              }>,
              private boardService: BoardService) {
  }

  ngAfterViewInit() {
    this.drawerService.setSearchDrawer(this.drawer);
  }

  searchBoard() {
    console.log(this.boardName)
    this.boardService.searchBoards(this.boardName).subscribe((boards: any) => {
      console.log(boards)
      if (boards) {
        this.boards = boards;
      }
    })
  }
}
