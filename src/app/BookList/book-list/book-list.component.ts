import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  selectedCategory: any;
  responseData: any;
  public isMobile: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'];
      this.responseData = params['resultData'];
      console.log(this.responseData, 'responseData');
      debugger;
    });
  }
}
