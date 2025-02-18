import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {map, Observable} from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private client: Socket) { }

  sendMessage(msg: string) {
    this.client.emit('message', msg);
  }

  getMessage() {
    return this.client.fromEvent('message')
  }

  joinBoard(boardId: string, tasks: column[]) {
    console.log('Joining board', boardId, tasks);
    this.client.emit('joinBoard', { boardId, tasks });
  }

  onTasksChange(boardId: string, tasks: column[]) {
    this.client.emit('tasksChange', { boardId, tasks });
  }

  listenForTasksChange():Observable<column[]> {
    return this.client.fromEvent('tasksChange')
  }

  onMouseMove(x: number, y: number) {
    this.client.emit('mouseMove', { x, y });
  }

  listenForMouseMove():Observable<{id:string, x: number, y: number}> {
    return this.client.fromEvent('mouseMove')
  }
}
