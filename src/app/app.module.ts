import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridListResponsiveModule } from '../lib/mat-grid-list-responsive/mat-grid-list-responsive.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookListComponent } from './BookList/book-list/book-list.component';
import { HomeComponent } from './BookList/home/home.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, BookListComponent, HomeComponent],
  imports: [
    BrowserModule,
    MatListModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatGridListModule,
    AppRoutingModule,
    MatGridListResponsiveModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
