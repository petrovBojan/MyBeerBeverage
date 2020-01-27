import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCardsComponent } from './Components/home-cards/home-cards.component'

import { FavouriteCardsComponent } from './Components/favourite/favourite-cards.component'

const routes: Routes = [
  { path: '', component: HomeCardsComponent},
  { path: 'favourite', component: FavouriteCardsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
