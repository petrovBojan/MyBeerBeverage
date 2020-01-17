import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { Beer } from '../../Models/Beer';
import { BeersService }  from '../../Services/beers.service';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.css']
})
export class DetailsPopupComponent implements OnInit {
  public beer: Beer;

  // The beers at the bottom will be randomized
  public similarBeers: Beer[] = [];

  constructor(
    private route: ActivatedRoute,
    private beerService: BeersService,
    public dialogRef: MatDialogRef<DetailsPopupComponent>

  ) {
    this.beer = this.beerService.selectedBeer;
  }

 /*  getSimilarsBeers() {
    let similarBeers = [];
    while (similarBeers.length < 3) {
      let item = this.beers[Math.floor(Math.random() * this.beers.length)];
      if (!similarBeers.includes(item)) {
        similarBeers.push(item);
      }
    }
    return similarBeers;
  }
 */
  async ngOnInit() {
    for (let i = 0; i < 3; i++) {
      const similarBeer = await this.beerService.getSimilarBeer().toPromise();
      this.similarBeers.push(...similarBeer);
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
