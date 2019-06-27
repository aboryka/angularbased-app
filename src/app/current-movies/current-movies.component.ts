import { MoviesService } from './../services/movies.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-current-movies",
  templateUrl: "./current-movies.component.html",
  styleUrls: ["./current-movies.component.css"]
})
export class CurrentMoviesComponent implements OnInit {


  constructor(private moviesService: MoviesService) {
    this.time = new Date();
  }

  time: Date;
  currentMovies: Array<any>;

  ngOnInit(): void {
    this.checkmoviesAvailability();
  }

  checkmoviesAvailability() {
    this.currentMovies = this.moviesService.movies.filter(movie => {
      const availibilities = movie.times.filter(availability => {
        if (this.checkTimeRange(availability.filmStarts) === true) {
          return (movie.times = Array.of(availability));
        }
      });
      return availibilities.length;
    });
    return this.currentMovies;
  }

  checkTimeRange(from) {
    const fromTime = this.dateSetter(from);
    if (+this.time <= +fromTime) {
      return true;
    }
    return false;
  }

  dateSetter(date) {
    const [hours, minutes] = date.split(":");
    const currentTime = new Date();

    currentTime.setHours(parseInt(hours));
    currentTime.setMinutes(parseInt(minutes));
    return currentTime;
  }
}
