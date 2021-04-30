import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMobile: boolean = false;
  responseData;
  filteredData = [];
  dataToFilter: any;
  categories = [
    { name: 'FICTION', value: 'Fiction', cols: 12, rows: 1 },
    { name: 'PHILOSOPHY', value: 'Philosophy', cols: 12, rows: 1 },
    { name: 'DRAMA', value: 'Drama', cols: 12, rows: 1 },
    { name: 'HISTORY', value: 'History', cols: 12, rows: 1 },
    { name: 'HUMOR', value: 'Humor', cols: 12, rows: 1 },
    { name: 'ADVENTURE', value: 'Adventure', cols: 12, rows: 1 },
    { name: 'POLITICS', value: 'Fiction', cols: 12, rows: 1 },
  ];
  category: any;
  selectedCategory: any;
  constructor(
    breakpointObserver: BreakpointObserver,
    private bookService: BookService,
    private router: Router
  ) {
    breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
  ngOnInit() {}
  selectCategory(category) {
    this.selectedCategory = category;
    this.bookService
      .getBooks()
      // .pipe(
      //   filter((res) => {
      //     this.responseData = res;
      //     this.filteredData = this.responseData.results;
      //     return (this.filteredData = _.filter(this.filteredData, (item) => {
      //       return item.formats['image/jpeg'];
      //     }));
      //   }) //
      // )
      .subscribe(
        (res) => {
          this.responseData = res;
          this.filteredData = this.responseData.results;
          if (category) {
            this.filteredData = _.filter(this.filteredData, (item) => {
              const subjects = item.subjects.join('');
              const cover = item.formats['image/jpeg'];
              return (
                (subjects.includes(category) ||
                  subjects.includes(category.toLowerCase())) &&
                cover
              );
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
