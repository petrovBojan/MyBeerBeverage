import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

import {Beer} from '../Models/Beer';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
beersUrl: string = 'https://api.punkapi.com/v2/beers';
limitBeers: string = '?per_page=55'
  constructor(private http:HttpClient) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.beersUrl}${this.limitBeers}`);
  }
}
