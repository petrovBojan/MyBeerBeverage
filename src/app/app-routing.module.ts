import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from '../app/Components/cards/cards.component'

import { FavoritesComponent } from '../app/Components/Pages/favorites/favorites.component'

const routes: Routes = [
  { path: '', component: CardsComponent},
  { path: 'favorite', component: FavoritesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
