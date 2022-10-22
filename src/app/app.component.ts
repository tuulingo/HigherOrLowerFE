import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HigherOrLowerFE';
  public movies: Movie[];
  public revealedMovie: Movie;
  public hiddenMovie: Movie;
  public isHardMode: Boolean;
  public totalMoviesCount: number;
  public categoryPlayed: string = '';
  public score: number = 0;
  public categories: any[] = [
    'vote_AVERAGE',
    'popularity',
    'runtime',
    'revenue',
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  public getMovie(movieId: number): void {
    this.movieService.getMovie(movieId).subscribe(
      (response: Movie) => {
        if (this.revealedMovie === null || this.revealedMovie === undefined) {
          this.revealedMovie = response;
        } else {
          this.hiddenMovie = response;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  public getMovies() {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        this.totalMoviesCount = this.movies.length;
        console.log(this.totalMoviesCount);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onClickCategory(category: string): void {
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    // while (this.revealedMovie === this.hiddenMovie){
    //   this.getMovie(Math.round(Math.random() * this.totalMoviesCount))
    // }
    this.categoryPlayed = category;
    var homeScreen = document.getElementById('home-screen');
    if (this.categoryPlayed !== '' || this.categoryPlayed !== null) {
      homeScreen.style.display = 'none';
    } else {
      homeScreen.style.display = 'block';
    }
  }

  // TODO: mõtle siia mingi parem lahendus, palun
  // for (let i = 0; i < this.categories.length; i++) {
  //   if(this.categories[i] === this.categoryPlayed) {
  //     this.revealedMovie.categoryPlayed
  //   }
  // } ["vote_AVERAGE", "popularity", "runtime", "revenue"];

  public onHigherClicked(): void {
    switch (this.categoryPlayed) {
      case 'vote_AVERAGE':
        if (this.revealedMovie.vote_AVERAGE < this.hiddenMovie.vote_AVERAGE) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.vote_AVERAGE}`
          );
        }
        break;
      case 'popularity':
        if (this.revealedMovie.popularity < this.hiddenMovie.popularity) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.popularity}`
          );
        }
        break;
      case 'runtime':
        if (this.revealedMovie.runtime < this.hiddenMovie.runtime) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.runtime}`
          );
        }
        break;
      case 'revenue':
        if (this.revealedMovie.revenue < this.hiddenMovie.revenue) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.revenue}`
          );
        }
        break;
    }
  }

  public onLowerClicked(): void {
    switch (this.categoryPlayed) {
      case 'vote_AVERAGE':
        if (this.revealedMovie.vote_AVERAGE > this.hiddenMovie.vote_AVERAGE) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.vote_AVERAGE}`
          );
        }
        break;
      case 'popularity':
        if (this.revealedMovie.popularity > this.hiddenMovie.popularity) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.popularity}`
          );
        }
        break;
      case 'runtime':
        if (this.revealedMovie.runtime > this.hiddenMovie.runtime) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.runtime}`
          );
        }
        break;
      case 'revenue':
        if (this.revealedMovie.revenue > this.hiddenMovie.revenue) {
          this.correctAnswerClicked();
        } else {
          alert(
            `Game ended with a score of: ${this.score}\n${this.hiddenMovie.original_TITLE} had vote average of: ${this.hiddenMovie.revenue}`
          );
        }
        break;
    }
  }

  public correctAnswerClicked(): void {
    this.score++;
    this.revealedMovie = this.hiddenMovie;
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
  }
}
