import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
  myControl = new FormControl();
  options: string[] = ['one', 'Two'];
  filteredOptions: Observable<string[]>;
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
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
          this.selectedCategory = category;
          this.responseData = res;
          // this.options = this.responseData.results;
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onClick(value) {
    console.log(value, 'value');
  }
}
