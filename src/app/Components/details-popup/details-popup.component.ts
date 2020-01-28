import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Beer } from '../../Models/Beer';
import { BeersService }  from '../../Services/beers.service';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.css']
})
export class DetailsPopupComponent implements OnInit {
 
  public similarBeers: Beer[] = [];

  constructor(
    private route: ActivatedRoute,
    private beerService: BeersService,
    public popUp: MatDialogRef<DetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public beer: any

  ) {
    //this.beer = this.beerService.selectedBeer;
  }

   async ngOnInit() {
    for (let i = 0; i < 3; i++) {
      const similarBeer = await this.beerService.getSimilarBeer().toPromise();
      this.similarBeers.push(...similarBeer);
    }
  } 

 public closePopUp() {
    this.popUp.close();
  }
}
