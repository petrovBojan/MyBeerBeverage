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

  constructor( 
    private beersService: BeersService,
     private popUp: MatDialog) { }

     public beers: Array<Beer> = [];
     private page: number = 1;
     private size: number = 25;
   
     public beer: Beer;
   
     public isLoadingBeers: Boolean = false;
     
     public searchQuery: FormControl = new FormControl();

     //public beer: Beer;


  ngOnInit() {
 //subscribe to input field changes
 this.searchQuery.valueChanges.pipe(  
  debounceTime(300),    //delay by 200ms for changes
  distinctUntilChanged(),  //ingnore similar emits
  switchMap((query) =>  this.beersService.searchBeerByName(query))  //trigger search on every query
)
.subscribe( (result:Array<Beer>) => 
{
  if(result.length < 1 && !this.searchQuery.value){
    this.getBeersList();  //reset beers list to alll beers, when inout bix is cleared
  }
  else{
    this.checkAndAddFavourites(result); //parse received beers to map against favourites
  }
});

//init withfething all beers
this.getBeersList();  
}

  getBeersList(page = this.page, size = this.size){
    //this.isLoadingBeers = true; //init spinner
    page = page >= 1 ? page : 1; //also helps when page is reloaded when scroll is at bottom.
    this.beersService.getBeers(page, size).subscribe(
      (response: any)=>{
        this.checkAndAddFavourites(response); //parse received beers to map against favourites
        //this.isLoadingBeers = false; //hide spinner
      },
      (error)=>{
        alert("Can't fetch Beers.") //can addd more error handling
        //this.isLoadingBeers = false;
      }
    )
  }

  checkAndAddFavourites(beersToParse: Array<Beer>){
    const favourites = this.beersService.getFavouriteBeers(); //get favourites indexes in service

    beersToParse.map(
      beer => {
        beer.isFavourite = favourites.includes(beer.id)? true : false; //add is favourite flag to favourites 
        return beer;
      }
    )

    if(this.page == 1){
      this.beers = beersToParse;  //if page number is1, cleer current beer list
    }
    else{
      this.beers = this.beers.concat(beersToParse);  //else add to current list
    }
  }
  
///handle add or remove favourite
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

    //////////////////
   openPopUp(): void {
    this.beersService.selectedBeer = this.beer;
    const popUpRef = this.popUp.open(DetailsPopupComponent,  {
      width: '60%'
    });
  }


   /*  
    public isFavourite() 
    {
      return this.beersService.isFavourite(this.beer);
    } */

    onScroll(){  //handle scroll trigger
      this.page++;
      this.getBeersList();
    }
}
