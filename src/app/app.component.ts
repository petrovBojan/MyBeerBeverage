import { Component } from '@angular/core';
import { Beer } from './Models/Beer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Beers';
  beers: Beer[] = [];

  public onSearch(beersSearched: Beer[]) {
    this.beers = beersSearched;
  }
}
