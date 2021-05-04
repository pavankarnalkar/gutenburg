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
  public isMobile: boolean = false;
  responseData;
  filteredData = [];
  responsive = true;
  cols = 1;
  dataToFilter: any;
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
  category: any;
  selectedCategory: any;
  myControl = new FormControl();
  options: string[] = ['one', 'Two'];
  filteredOptions: Observable<string[]>;
  userFilteredData = [];
  constructor(
    breakpointObserver: BreakpointObserver,
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );
  }
  findBook(event) {
    this.userFilteredData = _.filter(this.filteredData, (item) => {
      const title = item.title;
      // const authorArray = '';
      const authorArray = _.pluck(item.authors, 'name');
      const author = authorArray.join('');
      console.log(this.value, event.target.value, 'eeaeeee');
      return (
        title.includes(event.target.value) ||
        title.includes(event.target.value.toLowerCase()) ||
        author.includes(event.target.value) ||
        author.includes(event.target.value.toLowerCase())
      );
    });
    // this.cdr.detectChanges();
    // debugger;
  }

  // ngOnChanges() {
  //   this.filteredData;
  //   console.log(this.filteredData, 'filterdData');
  // }
  selectCategory(category) {
    this.selectedCategory = category;
    this.bookService.getBooks(category).subscribe(
      (res) => {
        this.selectedCategory = category;
        this.responseData = res;
        // this.options = this.responseData.results;
        this.filteredData = this.responseData.results;
        // if (category) {
        //   this.filteredData = _.filter(this.filteredData, (item) => {
        //     const subjects = item.subjects.join('');
        //     // const cover = item.formats['image/jpeg'];
        //     const bookshelves = item.bookshelves;
        //     return (
        //       subjects.includes(this.selectedCategory) ||
        //       subjects.includes(this.selectedCategory.toLowerCase()) ||
        //       bookshelves.includes(this.selectedCategory) ||
        //       bookshelves.includes(this.selectedCategory.toLowerCase())
        //     );
        //   });
        //   // this.userFilteredData = this.filteredData;
        // }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter((option) =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }

  // onClick(value) {
  //   console.log(value, 'value');
  // }
}
