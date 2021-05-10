import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  configUrl =
    'http://skunkworks.ignitesol.com:8000/books/?mime_type=image/jpeg';

  constructor(private http: HttpClient) {}
  getBooks(category) {
    return this.http.get(`${this.configUrl}&&topic=${category}`);
  }

  searchAuthorOrTitle(authorOrTitle, category) {
    return this.http.get(
      `${this.configUrl}&&search=${authorOrTitle}&&category=${category}`
    );
  }
}
