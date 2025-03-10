import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import {GatewayService} from '../../services/gateway/gateway.service';
import {AsyncPipe, NgClass, NgForOf} from '@angular/common';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarModule} from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import timegridPlugin from '@fullcalendar/timegrid';
import listPlug from '@fullcalendar/list';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {TaskDescriptionDialogComponent} from '../task-description-dialog/task-description-dialog.component';
import {ShareDialogComponent} from '../share-dialog/share-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FileService} from '../../services/file/file.service';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import * as authActions from '../../ngrx/auth/auth.actions';
import * as boardActions from '../../ngrx/board/board.actions';
import {AuthService} from '../../services/auth/auth.service';
import {filter, Observable, take} from 'rxjs';
import {Board, BoardState} from '../../ngrx/board/board.state';
import {List, ListState} from '../../ngrx/list/list.state';
import * as listActions from '../../ngrx/list/list.actions';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {ListService} from '../../services/list/list.service';

@Component({
  selector: 'app-drag-drop',
  imports: [
    CdkDropList, CdkDrag, CdkDropListGroup, FullCalendarModule, NgForOf, FormsModule, NavbarComponent, SidebarComponent, AsyncPipe, MatFormFieldModule, MatInputModule, MatButton
  ],
  templateUrl: './drag-drop.component.html',
  standalone: true,
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent implements OnInit, AfterViewInit {
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    timeZone: 'local',
    initialView: 'listMonth',
    businessHours: true, // display business hours
    editable: true,
    plugins: [timegridPlugin, dayGridPlugin, interactionPlugin, listPlug],
    events: [
      {
        title: 'Business Lunch',
        start: '2025-01-03T13:00:00',
        constraint: 'businessHours'
      },
      {
        title: 'Meeting',
        start: '2025-01-13T11:00:00',
        // constraint: 'availableForMeeting', // defined below
        color: '#257e4a'
      },
      {
        title: 'Conference',
        start: '2025-01-18',
        end: '2025-01-20'
      },
      {
        title: 'Party',
        start: '2025-01-29T20:00:00'
      },

      // // areas where "Meeting" must be dropped
      // {
      //   groupId: 'availableForMeeting',
      //   start: '2025-01-11T10:00:00',
      //   end: '2025-01-11T16:00:00',
      //   display: 'background'
      // },
      // {
      //   groupId: 'availableForMeeting',
      //   start: '2025-01-13T10:00:00',
      //   end: '2025-01-13T16:00:00',
      //   display: 'background'
      // },
      //   // red areas where no events can be dropped
      //   {
      //     start: '2025-01-24',
      //     end: '2025-01-28',
      //     overlap: false,
      //     display: 'background',
      //     color: '#ff9f89'
      //   },
      //   {
      //     start: '2025-01-06',
      //     end: '2025-01-08',
      //     overlap: false,
      //     display: 'background',
      //     color: '#ff9f89'
      //   }
    ]

  };

  token!: string
  board$!: Observable<Board | null>

  //firebase auth
  constructor(private gateway: GatewayService,
              private fileService: FileService,
              private store: Store<{
                auth: AuthState,
                board: BoardState,
                list: ListState
              }>,
              private listService: ListService
  ) {
    this.board$ = this.store.select('board', 'board')
  }

  login() {
    this.store.dispatch(authActions.signInWithGoogle());
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  isMouseLeave = false;
  data: {
    id: string;
    x: number;
    y: number;
  } = {id: 'abc', x: 0, y: 0};

  list$!: Observable<Board['lists'] | null>;

  ngOnInit() {
    this.gateway.getMessage().subscribe((data: unknown) => {
      console.log(data);
    });
    // this.gateway.listenForTasksChange().subscribe((data) => {
    //   this.columns$ = data;
    // })
    this.gateway.listenForMouseMove().subscribe((data: { id: string, x: number, y: number }) => {
      console.log(data)
      this.data = data;
    })
    // this.gateway.joinBoard('abc', this.columns);
    this.store.select('auth', 'isLogoutSuccess').subscribe((data) => {
      if (data) {
        this.store.dispatch(authActions.clearState());
      }
    })
    this.store.select('auth', 'loginErrorMessage').subscribe((data) => {
      if (data) {
        console.log(data);
      }
    })
    this.store.select('auth', 'idToken').subscribe((data) => {
      if (data) {
        this.token = data;
      }
    });
    this.store.select('auth', 'getAccessTokenSuccess').subscribe((data) => {
      if (data) {
        this.store.dispatch(authActions.login({accessToken: this.token}));
      }
    })
    this.store.select('board', 'isGettingBoardSuccess').subscribe((data) => {
      if (data) {
        this.store.select('board', 'board').pipe(take(1)).subscribe((data) => {
          if (data) {
            if (Array.isArray(data.lists)) {
              this.store.dispatch(listActions.storeLists({lists: data.lists}));
              this.columns$ = data.lists.map((list: List) => {
                return {
                  id: list.id,
                  createAt: list.createAt,
                  title: list.title,
                  cards: list.cards.map((card) => {
                    return {
                      id: card.id,
                      labels: card.labels,
                      createAt: card.createAt,
                      columnId: list.id,
                      title: card.title,
                      description: card.description
                    }
                  })
                }
              });
            }
          }
        })
      }
    })
    this.store.select('list', 'lists').subscribe((data) => {
      console.log(data)
      if (data && Array.isArray(data)) {
        this.columns$ = data.map((list: List) => {
          const foundColumn = this.columns$?.find((col) => col.id === list.id);

          const newCards = foundColumn?.cards ?? (Array.isArray(data[data.length - 1]?.cards) ? data[data.length - 1].cards : []);

          return {
            id: list.id,
            title: list.title,
            createAt: list.createAt,
            cards: newCards
          }
        })
      }
    });
  }

  ngAfterViewInit() {
    this.setBackground();
  }


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  columns$!: List[]

  drop(event: CdkDragDrop<any>) {
    const previousIndex = parseInt(event.previousContainer.id.split('-').pop()!, 10) - 1;
    const currentIndex = parseInt(event.container.id.split('-').pop()!, 10) - 1;

    if (event.previousContainer === event.container) {
      if (Array.isArray(this.columns$)) {
        console.log(this.columns$[previousIndex]);
        const updatedColumns = [...this.columns$[previousIndex].cards.map((card: any) => ({...card}))];
        moveItemInArray(updatedColumns, event.previousIndex, event.currentIndex);
        this.columns$ = this.columns$.map((col, index) => {
          if (index === previousIndex) {
            return {...col, cards: [...updatedColumns]};
          }
          return col;
        });
      }
    } else {
      const previousContainer = [...event.previousContainer.data.map((item: any) => ({...item}))];
      const container = [...event.container.data.map((item: any) => ({...item}))];
      transferArrayItem(
        previousContainer,
        container,
        event.previousIndex,
        event.currentIndex,
      );
      if (Array.isArray(this.columns$)) {
        this.columns$ = this.columns$.map((col, index) => {
          if (index === previousIndex) {
            return {...col, cards: [...previousContainer]};
          }
          if (index === currentIndex) {
            return {...col, cards: [...container]};
          }
          return col;
        });
      }
    }
    console.log(this.columns$);

    if (Array.isArray(this.columns$)) {
      console.log(this.columns$[previousIndex]);
      console.log(this.columns$[currentIndex]);
      this.store.dispatch(listActions.updateCard({
        previousList: this.columns$[previousIndex],
        list: this.columns$[currentIndex],
        boardId: '3cbd05d6-b90f-4707-a99d-00450b40a7da'
      }));
    }

    // this.gateway.onTasksChange('abc', this.columns$);
  }

  onColumnDrop($event: CdkDragDrop<any>) {
    console.log($event)
    if ($event.previousContainer === $event.container && Array.isArray(this.columns$)) {
      const updatedColumns = this.columns$.map(col => ({...col, cards: [...col.cards]}));
      moveItemInArray(updatedColumns, $event.previousIndex, $event.currentIndex);
      this.columns$ = updatedColumns;
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex,
      );
    }
    console.log(this.columns$);
    if (Array.isArray(this.columns$)) {
      this.store.dispatch(listActions.updatePosition({
        list: this.columns$,
        boardId: '3cbd05d6-b90f-4707-a99d-00450b40a7da'
      }));
    }
  }

  protected readonly signInWithPopup = signInWithPopup;

  formGroup = {
    cardId: '83f6e347-1916-4526-b93f-f102598687b0',
    file: File
  }
  files: File[] = [];

  upload() {
    console.log(this.files[0]);
    this.fileService.upload({
      cardId: this.formGroup.cardId,
      file: this.files[0]
    }).subscribe((data) => {
      console.log(data);
    })
  }

  upFileSelected($event: any) {
    const selectedFiles = $event.target.files;
    console.log(selectedFiles);
    if (selectedFiles.length > 0) {
      this.files = Array.from(selectedFiles);
      console.log(this.files);
    }
  }

  readonly dialog = inject(MatDialog);

  openDescriptionDialog() {
    const descriptionDialogRef = this.dialog.open(TaskDescriptionDialogComponent);

    descriptionDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getBoard() {
    console.log('get board');
    this.store.dispatch(boardActions.getBoard({boardId: '3cbd05d6-b90f-4707-a99d-00450b40a7da'}));
  }

  protected Array = Array;
  listName = '';

  addList() {
    this.store.dispatch(listActions.addNewList({
      list: {
        title: this.listName,
        createAt: new Date(),
        cards: [],
        id: ''
      }, boardId: '3cbd05d6-b90f-4707-a99d-00450b40a7da'
    }));
  }

  deleteColumn(column: List) {
    this.store.dispatch(listActions.deleteList({listId: column.id}));
  }

  setBackground() {
    const elements = document.getElementsByClassName('drag-drop');
    if (elements.length > 0) {
      const element = elements[0] as HTMLElement;
      this.board$.subscribe((board) => {
        if (!board?.background.color) {
          element.style.background = `url(${board?.background.fileLocation})`
        } else {
          element.style.background = board?.background.color;
        }
      });
    }
  }


  addCard(listId: string) {
    
  }
}
