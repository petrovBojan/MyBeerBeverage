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


   // Subscriptions to observables and their changes
   //private breakPointObserverSubscription: Subscription;
   /** Based on the screen size, switch from standard to one column per row */
   //public breakpoint = 3;
   //public rowHeight = '1:1';
  constructor(
    //private breakpointObserver: BreakpointObserver,
    private BeersService: BeersService) { 


  // When the breakpointObserver changes we check the breakpoint and then we
    // set the correct rows and ratio for them
    /*this.breakPointObserverSubscription = this.breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large]
    )
    .subscribe(observer => {
      if (observer.breakpoints[Breakpoints.XSmall]) {
        this.breakpoint = 1;
        this.rowHeight = '1:1.4';
      }
      if (observer.breakpoints[Breakpoints.Small]) {
        this.breakpoint = 1;
        this.rowHeight = '1:0.7';
      }
      if (observer.breakpoints[Breakpoints.Medium]) {
        this.breakpoint = 2;
        this.rowHeight = '1:0.9';
      }
       if (observer.breakpoints[Breakpoints.Large]) {
        this.breakpoint = 3;
        this.rowHeight = '1: 1.2';
      } 
    });*/
  }

  // When the page inits we must recover the beers saved as favourite
  async ngOnInit() {
    this.beers = this.BeersService
.getFavouriteBeers();
  }

/* // Destroy the subscription to avoid possible memory leaks
 ngOnDestroy() {
    this.breakPointObserverSubscription.unsubscribe();
  } */
  
}
