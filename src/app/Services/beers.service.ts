import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Beer} from '../Models/Beer';

@Injectable({
  providedIn: 'root'
})
export class BeersService {

beersUrl: string = 'https://api.punkapi.com/v2/beers';
limitBeers: string = '?per_page=55';

private _selectedBeer: Beer;

private _favouriteBeers: Map<Beer, boolean> = new Map<Beer, boolean>();


  constructor(private http:HttpClient) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.beersUrl}${this.limitBeers}`);
    
  }

  public searchByBeerName(name: string): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl + `?beer_name=${name}`);
  }

  /**
   * Returns an array with only 1 element, a random beer
   */
  public getSimilarBeer(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl + '/random');
  }


  public get selectedBeer(): Beer {
    const selectedBeer = this._selectedBeer;
    return this._selectedBeer;
  }
  public set selectedBeer(value: Beer) {
    this._selectedBeer = value;
  }


  public getFavouriteBeers(): Beer[] {
    const keys = Array.from( this._favouriteBeers.keys() );
    return keys.filter((key) => {
      return this._favouriteBeers.get(key);
    });
  }

  /**
   * Adds a new favourite beer
   * @param newFavourite beer to add
   */
  public addFavouriteBeer(newFavourite: Beer) {
    this._favouriteBeers.set(newFavourite, true);
  }

  /**
   * "removes" beer from favourites
   * @param beerToRemove beer to remove
   */
  public removeFavouriteBeer(beerToRemove: Beer) {
    this._favouriteBeers.set(beerToRemove, false);
  }

  /**
   * Returns true if the beer is favourite, false at contrary.
   * @param beerToCheck beer to check if its favourited.
   */
  public isFavourite(beerToCheck: Beer) {
    return this._favouriteBeers.get(beerToCheck) ? true : false;
  }


  /*// GET Beer by id. Will 404 if id not found 
  getBeer(id: number): Observable<Beer> {
    const url = `${this.beersUrl}/${id}`;
    return this.http.get<Beer>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)), 
      catchError(this.handleError<Beer>(`getBeer id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }; 
  }*/
}
