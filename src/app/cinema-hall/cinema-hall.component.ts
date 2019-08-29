import { MoviesService } from '../services/movies.service';
import { Movie, MovieService } from '../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cinema-hall',
  templateUrl: './cinema-hall.component.html',
  styleUrls: ['./cinema-hall.component.scss']
})
export class CinemaHallComponent implements OnInit {

  hallArr: Array<any>;
  hallColumns: number;
  hallRows: number;
  selectedSeats: number;
  movie: Movie;
  movieTime: string;
  currentDate: Date;

  constructor(private movieService: MovieService, private moviesService: MoviesService, private router: ActivatedRoute, public authService: AuthService) {

    this.currentDate = new Date;
    this.moviesService.tooltipClicked = new Array(1);
    this.createCinemaHall(8); // in the end we will be read values of columns and rows from the db

    this.router.queryParams.subscribe(params => {
      this.movie = this.movieService.getMovieById(params.id);
      this.movieTime = params.hours.concat(":", params.minutes);
      this.moviesService.globalReservationsConfig(this.movieTime, this.movie.title);
    });
  }

  ngOnInit() {
    this.loadCinemaHallView(15);
    this.moviesService.globalReservationsObs.subscribe(seats => {
      seats.forEach(seat => {

        const [rows, columns] = seat.text.split(" ");
        this.setUnavailableSeats(rows, columns);
      });
    });
    this.selectedSeats = 0;
  }

  setUnavailableSeats(n: number, m: number) {
    this.hallArr[n][m] = "reserved";
  }

  createCinemaHall(rows: number) {
    this.hallArr = [];

    for (let i = 0; i < rows; i++) {
      this.hallArr[i] = [];
    }

    return this.hallArr;
  }

  checkIfMovieTimeIsCorrect(): boolean {
    if (!this.movieTime) {
      return false;
    }

    return this.movie.times.find(time => {
      return this.movieTime === time.filmStarts;
    });
  }

  loadCinemaHallView(m: number) {
    this.hallRows = this.hallArr.length;
    this.hallColumns = m;

    for (let i = 0; i < this.hallRows; i++) {
      for (let j = 0; j < m; j++) {
        this.hallArr[i][j] = "available";
      }
    }
  }

  selectSeats(n: number, m: number) {
    if (this.selectedSeats !== 6) {
      this.hallArr[n][m] = (this.hallArr[n][m] === 'available') ? 'selected' : 'available';
      this.selectedSeats += (this.hallArr[n][m] === 'selected') ? 1 : -1;
    } else {
      alert("Nie można zarezerwować więcej niż 6 miejsc.")
    }
  }

  seatReservation() {
    if (this.selectedSeats === 0) {
      alert("Nie zaznczyłeś żadnych miejsc.");
      return false;
    }

    if (!this.authService.user) {
      return false;
    }

    this.triggerTooltip();
    this.selectedSeats = 0;
    this.moviesService.userReservationsConfig(this.movieTime, this.movie.title);

    for (let i = 0; i < this.hallRows; i++) {
      for (let j = 0; j < this.hallColumns; j++) {
        if (this.hallArr[i][j] === "selected") {
          this.moviesService.addReservation(i, j);
        }
      }
    }
  }

  triggerTooltip() {
    this.moviesService.customTooltip(0);
  }

}
