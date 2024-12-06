import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DocumentListComponent} from './components/document-list/document-list.component';

@Component({
  selector: 'app-root',
  imports: [DocumentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'maxdoc-ng';
}
