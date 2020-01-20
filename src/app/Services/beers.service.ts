import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Beer} from '../Models/Beer';

@Injectable({
  providedIn: 'root'
})
export class BeersService {

beersUrl: string = 'https://api.punkapi.com/v2/beers';
limitBeers: string = '?per_page=15';
beerName: string = '?beer_name=';
private mySelectedBeer: Beer;

private myFavouriteBeers: Map<Beer, boolean> = new Map<Beer, boolean>();


  constructor(private http:HttpClient) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.beersUrl}${this.limitBeers}`);
    
  }

  public searchByBeerName(name: string): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.beersUrl}${this.beerName}${name}`);
  }

  searchBeers(term: string): Observable<Beer[]> {

    if (!term.trim()) return of([]);
    let url = `${this.beersUrl}${this.beerName}${term.replace(" ", "_")}`;
    return this.http
      .get<[Beer]>(url)
      .pipe(tap(_ => console.log(`found heroes matching "${term}"`)));
  }
  
// SimilarBeers

  public getSimilarBeer(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl + '/random');
  }

// Selected Beers

  public get selectedBeer(): Beer {
    const selectedBeer = this.mySelectedBeer;
    return this.mySelectedBeer;
  }
  public set selectedBeer(value: Beer) {
    this.mySelectedBeer = value;
  }

////////////////////////////////////

  // favourite Beers

  public getFavouriteBeers(): Beer[] {
    const keys = Array.from( this.myFavouriteBeers.keys() );
    return keys.filter((key) => {
      return this.myFavouriteBeers.get(key);
    });
  }

  
  public addFavouriteBeer(newFavourite: Beer) {
    this.myFavouriteBeers.set(newFavourite, true);
  }


  public removeFavouriteBeer(beerToRemove: Beer) {
    this.myFavouriteBeers.set(beerToRemove, false);
  }

  public isFavourite(beerToCheck: Beer) {
    return this.myFavouriteBeers.get(beerToCheck) ? true : false;
  }

////////////////////

}
