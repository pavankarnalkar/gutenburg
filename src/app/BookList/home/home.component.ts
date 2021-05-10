import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
// import Fiction from '../../../assets/img/Fiction.svg'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  value;
  responseData;
  filteredData = [];
  categories = [
    {
      name: 'FICTION',
      value: 'Fiction',
      cols: 12,
      rows: 1,
      img: '../../../assets/img/Fiction.svg',
    },
    {
      name: 'PHILOSOPHY',
      value: 'Philosophy',
      cols: 12,
      rows: 1,
      img: '../../../assets/img/Philosophy.svg',
    },
    {
      name: 'DRAMA',
      value: 'Drama',
      cols: 12,
      rows: 1,
      img:
        'file:///C:/Users/Pavan/Desktop/GutenburgFinal/src/assets/img/Drama.svg',
    },
    {
      name: 'HISTORY',
      value: 'History',
      cols: 12,
      rows: 1,
      img: '../../../assets/img/History.svg',
    },
    {
      name: 'HUMOR',
      value: 'Humor',
      cols: 12,
      rows: 1,
      img: '../../../assets/img/Humor.svg',
    },
    {
      name: 'ADVENTURE',
      value: 'Adventure',
      cols: 12,
      rows: 1,
      img: '../../../assets/img/Adventure.svg',
    },
    {
      name: 'POLITICS',
      value: 'Politics',
      cols: 12,
      rows: 1,
      img: '../../../assets/img/Politics.svg',
    },
  ];
  selectedCategory: any;
  userFilteredData = [];
  constructor(private bookService: BookService, private router: Router) {}
  ngOnInit() {}
  findBook(event) {
    var regex = '\\s+$';
    this.value = event.target.value;
    if (event.target.value.startsWith(regex)) {
      if (event.target.value.includes(' ')) {
        var regex = '^\\s+$';
        event.target.value.replace(regex, '%20');
      }
    }
    this.bookService
      .searchAuthorOrTitle(
        event.target.value,
        this.selectedCategory.toLowerCase()
      )
      .subscribe((res) => {
        this.responseData = res;
        this.filteredData = this.responseData.results;
      });
  }
  selectCategory(category) {
    this.selectedCategory = category;
    this.bookService.getBooks(category).subscribe(
      (res) => {
        this.responseData = res;
        this.filteredData = this.responseData.results;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openBook(event, bookObj) {
    if (bookObj.formats['text/html; charset=utf-8']) {
      window.open(bookObj.formats['text/html; charset=utf-8'], '_blank');
    } else if (bookObj.formats['application/pdf']) {
      window.open(bookObj.formats['application/pdf'], '_blank');
    } else if (bookObj.formats['text/plain; charset=utf-8']) {
      window.open(bookObj.formats['text/plain; charset=utf-8'], '_blank');
    }
  }
}
