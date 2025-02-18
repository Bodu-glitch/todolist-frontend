import {Component, inject, OnInit} from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import {GatewayService} from '../../services/gateway/gateway.service';
import {NgClass, NgForOf} from '@angular/common';
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
import {AuthService} from '../../services/auth/auth.service';
import {filter} from 'rxjs';

interface card {
  id: string;
  columnId: string;
  title: string;
  description: string;
}

interface column {
  id: string;
  title: string;
  cards: card[];
}

const columns: column[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: '1',
        columnId: 'todo',
        title: 'Get to work',
        description: 'Get to work'
      },
      {
        id: '2',
        columnId: 'todo',
        title: 'Pick up groceries',
        description: 'Pick up groceries'
      },
      {
        id: '3',
        columnId: 'todo',
        title: 'Go home',
        description: 'Go home'
      },
      {
        id: '4',
        columnId: 'todo',
        title: 'Fall asleep',
        description: 'Fall asleep'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: '5',
        columnId: 'done',
        title: 'Get up',
        description: 'Get up'
      },
      {
        id: '6',
        columnId: 'done',
        title: 'Brush teeth',
        description: 'Brush teeth'
      },
      {
        id: '7',
        columnId: 'done',
        title: 'Take a shower',
        description: 'Take a shower'
      },
      {
        id: '8',
        columnId: 'done',
        title: 'Check e-mail',
        description: 'Check e-mail'
      },
      {
        id: '9',
        columnId: 'done',
        title: 'Walk dog',
        description: 'Walk dog'
      }
    ]
  },
  {
    id: 'test',
    title: 'Test',
    cards: [
      {
        id: '1',
        columnId: 'todo',
        title: 'Get to work',
        description: 'Get to work'
      },
      {
        id: '2',
        columnId: 'todo',
        title: 'Pick up groceries',
        description: 'Pick up groceries'
      },
      {
        id: '3',
        columnId: 'todo',
        title: 'Go home',
        description: 'Go home'
      },
      {
        id: '4',
        columnId: 'todo',
        title: 'Fall asleep',
        description: 'Fall asleep'
      }
    ]
  },
];

@Component({
  selector: 'app-drag-drop',
  imports: [
    CdkDropList, CdkDrag, CdkDropListGroup, FullCalendarModule, NgForOf, FormsModule, NavbarComponent, SidebarComponent
  ],
  templateUrl: './drag-drop.component.html',
  standalone: true,
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent implements OnInit {
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

  //firebase auth
  constructor(private gateway: GatewayService,
              private fileService: FileService,
              private store: Store<{ auth: AuthState }>,
  ) {

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

  ngOnInit() {
    this.gateway.getMessage().subscribe((data: unknown) => {
      console.log(data);
    });
    this.gateway.listenForTasksChange().subscribe((data: column[]) => {
      this.columns = data;
    })
    this.gateway.listenForMouseMove().subscribe((data: { id: string, x: number, y: number }) => {
      console.log(data)
      this.data = data;
    })
    this.gateway.joinBoard('abc', this.columns);
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
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  columns: column[] = [
    {...columns[0], cards: [...columns[0].cards]},
    {...columns[1], cards: [...columns[1].cards]},
    {...columns[2], cards: [...columns[2].cards]},
    {...columns[0], cards: [...columns[0].cards]}
  ];

  drop(event: CdkDragDrop<card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.columns);
    this.gateway.onTasksChange('abc', this.columns);
  }

  onColumnDrop($event: CdkDragDrop<any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex,
      );
    }
    console.log(this.columns);
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
}
