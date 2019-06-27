import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor() {}

  movies: Array<any> = [
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
}
