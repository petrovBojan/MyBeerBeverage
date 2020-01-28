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
  
  private favouriteBeers : Array<number> = []; 
  
  private mySelectedBeer: Beer;

  constructor(
    private http: HttpClient 
    ) { }

    getFavouriteBeers(){
      return this.favouriteBeers;
    }

    addFavouriteBeer(newBeerId: number){
      this.favouriteBeers.push(newBeerId);
      return this.favouriteBeers;
    }
    removeFavouriteBeer(id: number){
      let index = this.favouriteBeers.indexOf(id);
      this.favouriteBeers.splice(index, 1)
      return this.favouriteBeers;
    }

// Http povici

  searchBeerByName(query){
    if(!query){
      return of([])
    }
    return this.http.get(this.beersUrl + '?beer_name=' + query )
  }

  getBeers(page = 1, size = 25){
    return this.http.get(this.beersUrl + '?page=' + page + '&per_page=' + size)
  }

  /* getBeersByQuery(query){
    return this.http.get(this.beersUrl + query)
  } */

  getBeersByIds(ids: string){
    return this.http.get(this.beersUrl + '?ids=' + ids)
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
}