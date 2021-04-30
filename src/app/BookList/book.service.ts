import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  configUrl = 'http://skunkworks.ignitesol.com:8000/books';

  constructor(private http: HttpClient) {}
  getBooks() {
    return this.http.get(this.configUrl);
  }
}
