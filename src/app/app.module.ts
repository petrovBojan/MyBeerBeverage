import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import { HomeCardsComponent } from './Components/home-cards/home-cards.component';
import { FavouriteCardsComponent } from './Components/favourite/favourite-cards.component';
import { MaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsPopupComponent } from './Components/details-popup/details-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeCardsComponent,
    FavouriteCardsComponent,
    DetailsPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DetailsPopupComponent]
})
export class AppModule { }
