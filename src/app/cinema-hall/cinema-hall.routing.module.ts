import { CinemaHallComponent } from './cinema-hall.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const cinemaHallRoutes: Routes = [
  {
    path: 'sala-kinowa',
    component: CinemaHallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(cinemaHallRoutes)],
  exports: [RouterModule]
})

export class CinemaHallRouting {

}
