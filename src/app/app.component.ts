import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { MoviesService } from "./services/movies.service";
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MoviesService]
})
export class AppComponent implements OnDestroy {


  movies: Array<any> = [];
  subscriptionOne: Subscription;
  subscriptionTwo: Subscription;

  constructor(public authService: AuthService, private router: Router, public moviesService: MoviesService, private angularFire: AngularFireAuth){
   this.subscriptionTwo =  this.angularFire.authState.subscribe(user => {
      if (user) {
        this.subscriptionOne = this.moviesService
          .getMoviesToWatchObs()
          .subscribe((movies: Array<any>) => {
            this.movies = movies;
          });
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptionOne.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }
}
