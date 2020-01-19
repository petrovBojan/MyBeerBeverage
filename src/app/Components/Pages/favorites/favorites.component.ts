import { Component, OnInit, Input,  Output, EventEmitter, OnDestroy } from '@angular/core';
import { Beer } from '../../../Models/Beer';

import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BeersService } from '../../../Services/beers.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  beers: Beer[];


  constructor(
    private BeersService: BeersService) { 
  }

  async ngOnInit() {
    this.beers = this.BeersService
.getFavouriteBeers();
  }

  
}
