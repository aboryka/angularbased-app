import { Injectable, RendererFactory2 } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private db: AngularFireDatabase, private angularFire: AngularFireAuth) {
    this.sortByName();
    angularFire.authState.subscribe(user => {
      this.user = user;

      if(user) {
        this.moviesToWatchConfig();
      }
    });
  }

  private movies: Array<any> = [
    {
      id: "1",
      title: "The florida project",
      times: [
        { filmStarts: "12:00", filmEnds: "13:55" },
        { filmStarts: "15:30", filmEnds: "17:25" },
        { filmStarts: "18:30", filmEnds: "20:25" },
        { filmStarts: "23:00", filmEnds: "00:55" }
      ],
      filmLength: "1 godzina 55 minut",
      description: "Moonee ma sześć lat i zawadiacki uśmiech, a dni spędza poza domem z paczką przyjaciół. Dom w ich przypadku oznacza motel Magic Castle, wściekle liliowy budynek przypominający kiczowaty pałac z bajki. Mała rozrabiaka, razem ze swoją zbuntowaną mamą, Halley, układają sobie życie w niezwykłym miejscu, w którym przyszło im mieszkać. Nieświadoma coraz bardziej ryzykownych kroków, jakie podejmuje Halley, by opłacić pokój w motelu na kolejny tydzień, Moonee jest najszczęśliwszym dzieckiem na świecie. Całkiem, jakby czerpała energię z wychylającego się zza horyzontu pobliskiego Disneylandu.",
      filmGenre: ["Dramat"],
      actors: ["Willem Dafoe","Brooklynn Prince","Valeria Cotto", "Bria Vinaite", "Christopher Rivera", "Caleb Landry Jones", "Macon Blair", "Karren Karagulian"],
      director: "Sean Baker",
      scenario: ["Sean Baker", "Chris Bergoch"]
    },
    {
      id: "2",
      title: "Trzy billboardy za Ebbing, Missouri",
      times: [
        { filmStarts: "23:55", filmEnds: "01:50" },
        { filmStarts: "10:50", filmEnds: "12:45" },
        { filmStarts: "17:51", filmEnds: "19:46" }
      ],
      filmLength: "1 godz. 55 min.",
      description: "Małe miasteczko na amerykańskiej prowincji. Od morderstwa córki Mildred Hayes (nagrodzona Oscarem Frances McDormand) upłynęło kilka miesięcy, a lokalna policja nadal nie wpadła na trop sprawcy. Zdeterminowana kobieta decyduje się na śmiałe posunięcie: wynajmuje trzy tablice reklamowe na drodze wiodącej do miasteczka i maluje na nich prowokacyjny przekaz, skierowany do szanowanego przez lokalną społeczność szefa policji, szeryfa Williama Willoughby’ego (nominowany do Oscara Woody Harrelson). Gdy do akcji wkracza zastępca szeryfa, posterunkowy Dixon (Sam Rockwell) – niezrównoważony, porywczy maminsynek, któremu zarzuca się zamiłowanie do przemocy – starcie między Mildred Hayes a lokalnymi siłami porządkowymi przeradza się w otwartą wojnę.",
      filmGenre: ["Dramat", "komedia", "kryminał"],
      actors: ["Frances McDormand", "Woody Harrelson", "Sam Rockwell", "John Hawkes", "Peter Dinklage", "Abbie Cornish", "Lucas Hedges", "Željko Ivanek"],
      director: "Martin McDonagh",
      scenario: ["Martin McDonagh"]
    },
    {
      id: "3",
      title: "Pulp Fiction",
      times: [
        { filmStarts: "00:00", filmEnds: "02:34" },
        { filmStarts: "16:00", filmEnds: "18:34" },
        { filmStarts: "21:00", filmEnds: "22:34" }
      ],
      filmLength: "2 godziny 34 minut",
      description: "Płatni mordercy, Jules (Samuel L. Jackson) i Vincent (John Travolta), dostają zlecenie, by odzyskać z rąk przypadkowych rabusiów tajemniczą walizkę bossa mafii. Nie dość tego, Vincent dostaje kolejną robotę - na czas nieobecności gangstera w mieście ma zaopiekować się jego poszukującą wrażeń żoną Mią (Uma Thurman). Vincent i Jules niespodziewanie wpadają po uszy, gdy przypadkowo zabijają zakładnika. Kłopoty ma też podupadły bokser (Bruce Willis), który otrzymał dużą sumę za przegranie swojej walki. Walkę jednak wygrywa, a Los Angeles staje się od tej chwili dla niego za małe. Specjaliści od mokrej roboty będą mieli co robić...",
      filmGenre: ["Gangsterski"],
      actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis", "Harvey Keitel", "Ving Rhames", "Tim Roth", "Amanda Plummer"],
      director: "Quentin Tarantino",
      scenario: ["Quentin Tarantino"]
    },
    {
      id: "4",
      title: "Piraci z Karaibów: Klątwa Czarnej Perły",
      times: [
        { filmStarts: "15:00", filmEnds: "17:23" },
        { filmStarts: "17:00", filmEnds: "19:23" }
      ],
      filmLength: "2 godziny 23 minuty",
      description: "Karaiby, XVIII w., 10-letnia Elizabeth, córka gubernatora, jest świadkiem katastrofy statku, wyglądającej na robotę piratów. Z wody wyłowiono jednego ocalonego, małego chłopca, Willa Turnera, na szyi którego Elizabeth znajduje tajemniczy medalion, wyglądający na piracki. Przestraszona dziewczynka zrywa medalion i ukrywa go przed wszystkimi. Chwilę później widzi czarny statek z postrzępionymi żaglami i piracką flagą na maszcie, znikający we mgle.  8 lat później, Port Royal. Podczas uroczystości promocji Jamesa Norringtona, w którym ojciec Elizabeth widzi przyszłego zięcia, na komodora, dziewczyna spada ze skały do morza. Ratuje ją Jack Sparrow - pirat, który do Port Royal przybył aby kupić (ukraść) statek. W nagrodę Norrtington zakuwa go w kajdany i skazuje na śmierć przez powieszenie następnego dnia. Jednak w nocy Port Royal przeżywa atak piratów pod wodzą kapitana Barbossy, którzy chcą odzyskać tajemniczy medalion, ciągle będący w posiadaniu Elizabeth. Dziewczyna zostaje porwana, a piraci odpływają i nikt nie wie, gdzie szukać córki gubernatora. Zakochany w niej Will Turner zwraca się o pomoc do Jacka Sparrowa, choć nienawidzi on piratów. Uwolniwszy go z celi, razem z nim kradnie (rekwiruje) statek i wyrusza, najpierw na Tortugę, a potem w ślad za niedoścignioną Czarną Perłą, statkiem Barbossy, by ocalić swoją ukochaną.",
      filmGenre: ["Fantasy", "Przygodowy", "Komedia"],
      actors: ["Johnny Depp", "Geoffrey Rush", "Orlando Bloom", "Keira Knightley", "Jack Davenport"],
      director: "Gore Verbinski",
      scenario: ["Ted Elliott","Terry Rossio"]
    },
    {
      id: "5",
      title: "Mary i Max",
      times: [
        { filmStarts: "17:00", filmEnds: "18:32" },
        { filmStarts: "18:30", filmEnds: "20:02" },
        { filmStarts: "23:30", filmEnds: "01:02" }
      ],
      filmLength: "1 godziny 32 minut",
      description: "Mary jest ośmioletnią dziewczynką mieszkającą w Australii. Przez swoje kompleksy nie ma przyjaciół. Pewnego dnia postanawia napisać list do kogoś kto mieszka w Ameryce. Wybór pada na Maxa, mieszkańca Nowego Jorku. Max z kolei jest 40-letnim samotnikiem mieszkającym przy Manhattanie. Dzięki korespondencyjnej znajomości jaka zostaje nawiązana rodzi się przyjaźń, która pomimo odległości jest w stanie przetrwać wiele wzlotów i upadków zarówno Maxa jak i Mary.",
      filmGenre: ["Animacja", "Dramat", "Komedia"],
      actors: ["Toni Collette", "Philip Seymour Hoffman", "Barry Humphries", "Eric Bana", "Bethany Whitmore"],
      director: "Adam Elliot",
      scenario: ["Adam Elliot"]
    },
    {
      id: "6",
      title: "Green Book",
      times: [{ filmStarts: "23:00", filmEnds: "01:10" }],
      filmLength: "2 godziny 10 minut",
      description: "Tony, drobny cwaniaczek z Bronxu, z nadzieją na zgarnięcie konkretnej sumki, zatrudnia się jako szofer wybitnego, ekstrawaganckiego muzyka Dona Shirleya. Razem wyruszają w wielotygodniowe tournée na południe Stanów Zjednoczonych. Z pozoru różni ich wszystko: od majątku i wykształcenia, przez sposób bycia, po ulubione jedzenie i rozrywki. Z czasem jednak będą mieli okazję przekonać się, że tak naprawdę więcej ich łączy, niż dzieli. Ich wspólna, pełna przygód podróż stanie się początkiem nieprawdopodobnej przyjaźni.",
      filmGenre: ["Dramat", "Komedia"],
      actors: ["Viggo Mortensen", "Mahershala Ali", "Linda Cardellini", "Sebastian Maniscalco", "Dimiter D. Marinov", "Mike Hatton", "P.J. Byrne", "Joe Cortese"],
      director: "Peter Farrelly",
      scenario: ["Peter Farrelly", "Brian Hayes Currie", "Nick Vallelonga"]
    }
  ];

  user: User;
  moviesToWatchObs: Observable<any[]>
  moviesRef: AngularFireList<any> = null;

  sortByName() {
    this.movies.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortByTime() {
    this.movies.forEach(m =>
      m.times.sort((a, b) => {
        if (a.filmStarts < b.filmStarts) {
          return -1;
        } else if (a.filmStarts > b.filmStarts) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }

  moviesToWatchConfig(): void {
    this.moviesRef = this.db.list(`movies/${this.user.uid}`);
    this.moviesToWatchObs = this.moviesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, text: c.payload.val() }))
      )
    );
  }

  addToWatchList(movie: string): void {
    let movieExist: boolean = false;
    this.moviesToWatchObs.subscribe(data => {
      data.forEach(d => {
        if(movie === d.text) {
          movieExist = true;
        }
      })

      if(!movieExist) {
        this.moviesRef.push(movie);
      }
      })
  }

  removeFromWatchList(key: string): void {
    this.moviesRef.remove(key);
  }

  getMoviesToWatchObs(): Observable<any[]> {
    return this.moviesToWatchObs;
  }

  getMovies() {
    return this.movies;
  }
}
