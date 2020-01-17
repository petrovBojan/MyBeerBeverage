import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from 'src/app/Models/Beer';
import { BeersService } from '../../Services/beers.service'
import { MatDialog } from '@angular/material';
import { DetailsPopupComponent } from '../details-popup/details-popup.component'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
}) 
export class CardComponent implements OnInit {
  @Input() beer: Beer;

  constructor( 
    private beersService: BeersService,
     private popUp: MatDialog) { }

  ngOnInit() {
  }

  openPopUp(): void {
    this.beersService.selectedBeer = this.beer;
    const popUpRef = this.popUp.open(DetailsPopupComponent,  {
      width: '60%'
    });
  }


    public addFavourite(event) {
      event.stopPropagation();
      if (this.beersService.isFavourite(this.beer)) {
        this.beer.is_favourite = false;
        this.beersService.removeFavouriteBeer(this.beer);
      } 
      else {
        this.beer.is_favourite = true;
        this.beersService.addFavouriteBeer(this.beer);
      }
    }

    /**
     * Method used to check if the beer is favourited or not.
     */
    public isFavourite() 
    {
      return this.beersService.isFavourite(this.beer);
    }
}
