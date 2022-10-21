import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// samat moviet ei saa võrrleda
export class AppComponent {
  title = 'HigherOrLowerFE';
  public movies: Movie[];
  public initialMovie: Movie;
  public revealedMovie: Movie;
  public hiddenMovie: Movie;
  public isHardMode: Boolean;
  public totalMoviesCount: number;
  public categoryPlayed: string;

  constructor(private movieService: MovieService){}

  ngOnInit() {
    this.getMovie(2);
  }

  public getMovie(movieId: number): void {
    this.movieService.getMovie(movieId).subscribe(
      (response: Movie) => {
        this.initialMovie = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
        alert(error.message);
      }
    )
  }

  public getMovies() {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        this.totalMoviesCount = this.movies.length;
        console.log(this.totalMoviesCount)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onClickCategory(category: string): void{
    this.categoryPlayed = category
    console.log(this.categoryPlayed)
  }

}
