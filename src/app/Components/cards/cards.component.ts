import { Component, OnInit } from '@angular/core';
import {BeersService} from '../../Services/beers.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Beer } from '../../Models/Beer'
//import { FavoritesComponent } from '../Pages/favorites/favorites.component';
import { DetailsPopupComponent } from '../details-popup/details-popup.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  beers: Beer[];
 
  constructor(private beersService:BeersService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.beersService.getBeers().subscribe(beers => {
      this.getBeers();
    });
  }
  getBeers(): void {
    this.beersService.getBeers()
    .subscribe(beers => this.beers = beers);
  }
  
}
 