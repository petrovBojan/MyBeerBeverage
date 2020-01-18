import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Beer } from '../../Models/Beer';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BeersService } from '../../Services/beers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchCtrl = new FormControl();
  searchBeers: Beer[];

  beers: Beer[] = [];

  @Output() searchedBeers: EventEmitter<Beer[]> = new EventEmitter<Beer[]>();

  searchSubscription: Subscription;

  constructor(
    private beersService: BeersService,
    private router: Router
  ) { 
    this.searchSubscription = this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.beersService.searchByBeerName(value),
        )).subscribe((beers) => {
          this.searchBeers = beers;
          this.searchedBeers.emit(beers);
        });
  }

  ngOnInit() {
  }

  public onSearch(beersSearched: Beer[]) {
    this.beers = beersSearched;
  }

}
