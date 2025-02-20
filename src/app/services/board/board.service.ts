import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  accesToken!: string;

  constructor(private httpClient: HttpClient,
              private store: Store<{ auth: AuthState }>) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      this.accesToken = auth;
    });
  }

  getBoard(id: string): Observable<any> {
    console.log(this.accesToken);
    return this.httpClient.get(`http://localhost:3000/board/${id}`, {headers: {Authorization: this.accesToken}});
  }

  searchBoards(search: string) {
    return this.httpClient.post(`http://localhost:3000/board/search`,{search}, {headers: {Authorization: this.accesToken}});
  }

}
