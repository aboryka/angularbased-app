import { Movie, MovieService } from './../../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

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
  hours: string;
  minutes: string;
  date: Date;

  constructor(private movieService: MovieService, private router: ActivatedRoute) {
    this.create2DArray(8);

    this.router.queryParams.subscribe(params => {
      this.movie = this.movieService.getMovieById(params.id);
      this.hours = params.hours;
      this.minutes = params.minutes;
    });
  }

  ngOnInit() {
    this.loadCinemaHallView(15);
    this.selectedSeats = 0;
    this.date = new Date();
  }

  create2DArray(rows: number) {
    this.hallArr = [];

    for (let i = 0; i < rows; i++) {
      this.hallArr[i] = [];
    }

    return this.hallArr;
  }

  loadCinemaHallView(m: number, userId?: string) {
    this.hallColumns = this.hallArr.length;
    this.hallRows = m;

    for (let i = 0; i < this.hallColumns; i++) {
      for (let j = 0; j < m; j++) {
        this.hallArr[i][j] = false;
      }
    }
  }

  seatReservation(n: number, m: number, userId?: string) {
    if (this.selectedSeats !== 6 || this.selectedSeats === 6 && this.hallArr[n][m]) {
      this.hallArr[n][m] = !this.hallArr[n][m];
      this.selectedSeats += (+this.hallArr[n][m] ? 1 : -1);
    } else {
        alert("Nie można zarezerwować więcej niż 6 miejsc.")
      }
    }

  }
