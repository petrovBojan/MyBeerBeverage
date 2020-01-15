import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { CardsComponent } from './Components/cards/cards.component';
import { CardComponent } from './Components/card/card.component';
import { FavoritesComponent } from './Components/Pages/favorites/favorites.component';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    CardsComponent,
    CardComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
