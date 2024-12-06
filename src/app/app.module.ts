import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DocumentListComponent} from './components/document-list/document-list.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppComponent, DocumentListComponent, MatIconModule],
  providers: [],
})
export class AppModule {}
