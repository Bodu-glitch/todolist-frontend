import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import {ListState, List} from '../../ngrx/list/list.state';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  accesToken!: string;

  constructor(private httpClient: HttpClient,
              private store: Store<{ auth: AuthState }>) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      if (auth) {
        this.accesToken = auth;
      }
    });
  }

  addNewList( list: List, boardId: string) {
    return this.httpClient.post(`http://localhost:3000/list/new-list`, {
      list,
      boardId
    }, {headers: {Authorization: this.accesToken}});
  }

  getLists(boardId: string) {
    console.log(this.accesToken);
    return this.httpClient.get(`http://localhost:3000/list/cards/${boardId}`, {headers: {Authorization: this.accesToken}});
  }

  updateLists(lists: List[], boardId: string) {
    return this.httpClient.put(`http://localhost:3000/list/update-lists`, {
      lists,
      boardId
    }, {headers: {Authorization: this.accesToken}});
  }

  updateListCard(previousList: List, list: List, boardId: string) {
    console.log(previousList, list, boardId);
    return this.httpClient.put(`http://localhost:3000/list/update-list/card`, {
      previousList,
      list,
      boardId
    }, {headers: {Authorization: this.accesToken}});
  }

  deleteList(listId: string) {
    return this.httpClient.delete(`http://localhost:3000/list/${listId}`, {headers: {Authorization: this.accesToken}});
  }
}
