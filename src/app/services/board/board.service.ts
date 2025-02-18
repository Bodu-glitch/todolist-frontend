import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private httpClient: HttpClient) {
  }

  getBoard(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/board/${id}`);
  }

}
