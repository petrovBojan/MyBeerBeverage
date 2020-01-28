import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from 'src/app/Models/Beer';
import { BeersService } from '../../Services/beers.service';
import { MatDialog } from '@angular/material';
import { DetailsPopupComponent } from '../details-popup/details-popup.component'

import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css']
}) 
export class HomeCardsComponent implements OnInit {

  public beers: Array<Beer> = [];
  private page: number = 1;
  private size: number = 25;

  public beer: Beer;

  //public isLoadingBeers: Boolean = false;
  
  public searchQuery: FormControl = new FormControl();

  constructor(
    private beersService: BeersService,
    private popUp: MatDialog
     ) { }

    
  ngOnInit() {
  this.searchQuery.valueChanges.pipe(  
    debounceTime(300),   
    distinctUntilChanged(), 
    switchMap((query) =>  this.beersService.searchBeerByName(query))  
  )
  .subscribe( (result:Array<Beer>) => 
  {
    if(result.length < 1 && !this.searchQuery.value){
      this.getBeersList();
    }
    else{
      this.checkAndAddFavourites(result); 
    }
  });

  this.getBeersList();  
  }

  getBeersList(page = this.page, size = this.size){
    //this.isLoadingBeers = true; 
    page = page >= 1 ? page : 1; 
    this.beersService.getBeers(page, size).subscribe(
      (response: any)=>{
        this.checkAndAddFavourites(response);
        //this.isLoadingBeers = false; 
      },
      (error)=>{
        alert("Can't fetch Beers.")
        //this.isLoadingBeers = false;
      }
    )
  }

  checkAndAddFavourites(beersToParse: Array<Beer>){
    const favourites = this.beersService.getFavouriteBeers(); 

    beersToParse.map(
      beer => {
        beer.isFavourite = favourites.includes(beer.id)? true : false;
        return beer;
      }
    )

    if(this.page == 1){
      this.beers = beersToParse; 
    }
    else{
      this.beers = this.beers.concat(beersToParse); 
    }
  }
  
updateFavourite(beer: Beer, index){
  if(beer.isFavourite){
    this.beersService.removeFavouriteBeer(beer.id);
    this.beers[index].isFavourite = false;
  }
  else{
    this.beersService.addFavouriteBeer(beer.id);
    this.beers[index].isFavourite = true;
  }
}

   openPopUp(beer: any)  {
    //this.beersService.selectedBeer = this.beer;
    const popUpRef = this.popUp.open(DetailsPopupComponent,  {
      width: '80%',
      data: beer
    });
  }

    onScroll(){ 
      this.page++;
      this.getBeersList();
    }
}
