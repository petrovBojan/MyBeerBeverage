import { Component, OnInit } from '@angular/core';
import {BeersService} from '../../Services/beers.service';

import { Beer } from '../../Models/Beer'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  beers: Beer[];

  constructor(private beersServices:BeersService) { }

  ngOnInit() {
    this.beersServices.getBeers().subscribe(beers => {
      this.beers = beers;
    });
  }

}
