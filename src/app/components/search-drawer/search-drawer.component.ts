import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DrawerService} from '../../services/drawer.service';
import {MaterialModule} from '../../shared/modules/material.module';
import {RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {keyframes} from '@angular/animations';
import * as boardActions from '../../ngrx/board/board.actions';

@Component({
  selector: 'app-search-drawer',
  imports: [MaterialModule, RouterOutlet, NgStyle, FormsModule, ReactiveFormsModule],
  templateUrl: './search-drawer.component.html',
  standalone: true,
  styleUrl: './search-drawer.component.scss'
})
export class SearchDrawerComponent implements AfterViewInit, OnInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  @Input() isSearchOpen = false;

  boards: {
    name: string;
    image: string;
  }[] = []
  boardName: string = '';
  interval: any;


  constructor(protected drawerService: DrawerService,
              private store: Store<{
                board: BoardState
              }>) {
  }

  ngOnInit() {
    this.store.select('board', 'isSearchingBoardsSuccess').subscribe((isSearchingBoardsSuccess) => {
      if(isSearchingBoardsSuccess){
        this.store.select('board', 'searchBoards').subscribe((boards) => {
          this.boards = boards.map((board) => {
            return {
              name: board.name,
              image: board.backgroundId
          };
        })
      })
    }})
  }


  ngAfterViewInit() {
    this.drawerService.setSearchDrawer(this.drawer);
  }

  searchBoard() {
    this.store.dispatch(boardActions.searchBoards({search: this.boardName}))
  }

  boardNameChange(event: any) {
    if(this.boardName != ''){
      clearInterval(this.interval)
      this.interval = setTimeout(() => {
        this.searchBoard()
      },500)
    }
  }

  protected readonly keyframes = keyframes;
}
