import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Beer } from '../../Models/Beer';

import { Subscription } from 'rxjs';
import { BeersService } from '../../Services/beers.service';

import { MatDialog } from '@angular/material';
import { DetailsPopupComponent } from '../details-popup/details-popup.component'

@Component({
  selector: 'app-favourite-cards',
  templateUrl: './favourite-cards.component.html',
  styleUrls: ['./favourite-cards.component.css']
})
export class FavouriteCardsComponent implements OnInit {

  public favouriteBeersList: Array<number> = [];
  public favouriteBeers: Array<Beer> = [];
  public beer: Beer;

  public isFetchingBeers: Boolean = false;


  constructor(
    private beersService: BeersService,
    private popUp: MatDialog ) { 
  }

 ngOnInit() {
  this.getFavouriteBeers(); 
}

getFavouriteBeers(){ 
  this.favouriteBeersList = this.beersService.getFavouriteBeers(); 

  this.isFetchingBeers = true;
  this.beersService.getBeersByIds(this.favouriteBeersList.join("|")).subscribe( 
    (response: any)=>{
      response.map((beer: Beer) => {
          beer.isFavourite = true;
          return beer;
        }
      )
      this.favouriteBeers = response;
      this.isFetchingBeers = false;
    },
    (error)=>{
      alert("Can't fetch errors") 
      this.isFetchingBeers = false;
    }
  )
}
removeFavourite(beer: Beer, index){  
  this.favouriteBeersList = this.beersService.removeFavouriteBeer(beer.id);
  this.favouriteBeers.splice(index, 1);
}

openPopUp(beer: any)  {
  //this.beersService.selectedBeer = this.beer;
  const popUpRef = this.popUp.open(DetailsPopupComponent,  {
    width: '60%',
    data: beer
  });
}
}
