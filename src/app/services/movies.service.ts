import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor() {
    console.log(this.movies)
    this.sortByname();
  }

  private movies: Array<any> = [
    {
      title: "Szybcy i wściekli",
      times: [
        { filmStarts: "12:00", filmEnds: "13:46" },
        { filmStarts: "15:30", filmEnds: "17:16" },
        { filmStarts: "18:30", filmEnds: "20:16" },
        { filmStarts: "23:00", filmEnds: "00:46" }
      ],
      filmLenght: "1 godzina 46 minut",
      description: "",
      actors: []
    },
    {
      title: "Film 2",
      times: [
        { filmStarts: "23:55", filmEnds: "01:55" },
        { filmStarts: "10:50", filmEnds: "12:50" },
        { filmStarts: "17:51", filmEnds: "19:51" }
      ],
      filmLenght: "2 godziny",
      description: "",
      actors: []
    },
    {
      title: "Film 3",
      times: [
        { filmStarts: "00:00", filmEnds: "02:15" },
        { filmStarts: "16:00", filmEnds: "18:15" },
        { filmStarts: "21:00", filmEnds: "22:15" }
      ],
      filmLenght: "2 godziny 15 minut",
      description: "",
      actors: ["Jessica Alba"]
    },
    {
      title: "Film 4",
      times: [
        { filmStarts: "15:00", filmEnds: "16:30" },
        { filmStarts: "17:00", filmEnds: "18:30" }
      ],
      filmLenght: "1 godzina 30 minut",
      description: "",
      actors: []
    },
    {
      title: "Film 5",
      times: [
        { filmStarts: "17:00", filmEnds: "19:30" },
        { filmStarts: "18:30", filmEnds: "21:00" },
        { filmStarts: "23:30", filmEnds: "02:00" }
      ],
      filmLenght: "2 godziny 30 minut",
      description: "",
      actors: []
    },
    {
      title: "Film 6",
      times: [{ filmStarts: "00:00", filmEnds: "02:10" }],
      filmLenght: "2 godziny 10 minut",
      description: "",
      actors: []
    }
  ];

  sortByname(){
    this.movies.sort((a,b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    })
  }

  private moviesToWatch: Array<any> = [];
  private moviesToWatchObs = new BehaviorSubject<Array<any>>(
    this.moviesToWatch
  );

  addToWatchList(movie: Array<any>): void {
    if (this.checkWatchList(movie)) {
      this.moviesToWatch.push(movie);
      this.moviesToWatchObs.next(this.moviesToWatch);
    }
  }

  checkWatchList(movie: Array<any>): boolean {
    let i = this.moviesToWatch.length;
    while (i--) {
      if (this.moviesToWatch[i] === movie) {
        return false;
      }
    }
    return true;
  }

  removeFromWatchList(movie: Array<any>): void {
    this.moviesToWatch = this.moviesToWatch.filter(m => m !== movie);
    this.moviesToWatchObs.next(this.moviesToWatch);
  }

  getMoviesToWatchObs(): Observable<Array<any>> {
    return this.moviesToWatchObs.asObservable();
  }

  getMovies(){
    return this.movies;
  }
}
