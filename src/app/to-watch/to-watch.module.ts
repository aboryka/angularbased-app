import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ToWatchListComponent, ToWatchComponent } from './index';

@NgModule({
  declarations: [
    ToWatchListComponent, ToWatchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToWatchComponent, ToWatchListComponent
  ]
})
export class ToWatchModule {

}
