import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  upload(req: {
    cardId: string;
    file: File;
  }) {
    const formData = new FormData();
    formData.append('file', req.file);
    formData.append('cardId', req.cardId);
    return this.httpClient.post('http://localhost:3000/card-attachment/upload-file',formData , {
      headers: new HttpHeaders({
        'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0MzRmMzFkN2Y3NWRiN2QyZjQ0YjgxZDg1MjMwZWQxN2ZlNTk3MzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiMzktTmd1eeG7hW4gxJDhurduZyBHaWEgVMaw4budbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSzNQWlZUZU1zYTdrUkdWeXJBRUpON3ljVDE3bmxEcDI1QlJYSDFKaHlIZjFGS3VRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3RvZG9saXN0LTI0Ni0yNWEiLCJhdWQiOiJ0b2RvbGlzdC0yNDYtMjVhIiwiYXV0aF90aW1lIjoxNzM4ODE4OTkwLCJ1c2VyX2lkIjoiRG0wd3BYOU40NFJrTDlkeElSaFNiaFQ0aHFwMiIsInN1YiI6IkRtMHdwWDlONDRSa0w5ZHhJUmhTYmhUNGhxcDIiLCJpYXQiOjE3Mzg4MTg5OTAsImV4cCI6MTczODgyMjU5MCwiZW1haWwiOiJ0bjIxMjA3OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjQ1NTIwOTcxMDAyNDk4NTA5OCJdLCJlbWFpbCI6WyJ0bjIxMjA3OUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.UtpjFyhSP3DbhTC4Vjzz6NjHfKbfRclV5fOvS74sujUDoBgXkcjdCQn3L2n-Lq34X5k-1t3Ut-YSYUx5A6fdugCTburtJM1SupOEuO_2AfpAaYjCcp_GdTwGbpF1jvNpXCGYnqaBTq9EMXObSENtv5cVgWH1qI0S__BDrpPv9Pb7X4NjbEoGfFKRDVNIIHyAAFR48qzrVKUsMiUZuGEcDsn51cuGHppnXrDcBshFIclC5Us9u0Y15tF74SqsrUSm-MK8gm1Cd1cgrb5D8pKXxY7-O7YsJsNYQYaduzKGx0BAer9hkMAZoYj8sY1EeOHVweUQUGxQ7kX8LitpoJFklA',
      })
    });
  }
}
