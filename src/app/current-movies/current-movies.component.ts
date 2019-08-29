import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-current-movies",
  templateUrl: "./current-movies.component.html",
  styleUrls: ["./current-movies.component.scss"],
  providers: [MoviesService]
})
export class CurrentMoviesComponent implements OnInit {
  constructor(private moviesService: MoviesService, private router: Router) {
    this.time = new Date();
  }

  time: Date;
  currentMovies: Array<any>;
  avail: Array<any> = [];

  ngOnInit(): void {
    this.moviesService.sortByTime();
    this.checkmoviesAvailability();
  }

  seatReservation(movieId: number, movieTime: string): void {
    const [hours, minutes] = movieTime.split(":");
    this.router.navigate(["/sala-kinowa"], {queryParams: { id: movieId, hours: hours, minutes: minutes}});
  }

  checkmoviesAvailability(): Array<any> {
    this.currentMovies = this.moviesService.getMovies().filter(movie => {
      this.avail = [];
      const availibilities = movie.times.filter((availability: { filmStarts: string; filmEnds: string }) => {
        if (this.checkTimeRange(availability.filmStarts) === true) {
          return this.avail.push(availability);
        }
      });
      movie.times = this.avail;
      return availibilities.length;
    });
    return this.currentMovies;
  }

  checkTimeRange(from: string): boolean {
    const fromTime = this.dateSetter(from);
    if (+this.time <= +fromTime) {
      return true;
    }
    return false;
  }

  dateSetter(date: string): Date {
    const [hours, minutes] = date.split(":");
    const currentTime = new Date();

    // tslint:disable-next-line: radix
    currentTime.setHours(parseInt(hours));

    // tslint:disable-next-line: radix
    currentTime.setMinutes(parseInt(minutes));

    return currentTime;
  }

}
