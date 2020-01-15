import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
