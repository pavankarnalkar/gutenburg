import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMobile: boolean = false;
  responseData;
  filteredData: any;
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
  constructor(
    breakpointObserver: BreakpointObserver, 
    private bookService: BookService
  ) {
    breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
  ngOnInit() {}
  selectCategory(category) {
    this.bookService.getBooks().subscribe((res) => {
      this.responseData = res;
      this.dataToFilter = this.responseData.results;
      if (category) {
        this.dataToFilter = _.filter(this.dataToFilter, (data) => {
          data.subjects.map((subject) => {
            if (
              subject.includes(category) ||
              subject.toLowerCase().includes(category)
            )
              // _.where(subject, { author: 'Shakespeare', year: 1611 });
              return data;
          });
        });
      }
      debugger;
    });
  }
}
