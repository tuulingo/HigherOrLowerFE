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
  public categoryPlayed: any = '';
  public currentScore: number = 0;
  public categories: any[] = [
    'vote_AVERAGE',
    'popularity',
    'runtime',
    'revenue',
  ];
  public math: Math = Math;
  public gameOver: Boolean = false;
  public easyModeScore: number = 0;
  public hardModeScore: number = 0;

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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onClickCategory(category: string): void {
    this.revealedMovie = undefined;
    this.hiddenMovie = undefined;
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    // while (this.revealedMovie === this.hiddenMovie){
    //   this.getMovie(Math.round(Math.random() * this.totalMoviesCount))
    // }
    this.categoryPlayed = category;
    var homeScreen = document.getElementById('home-screen');
    var gameScreen = document.getElementById('game-screen');
    if (this.categoryPlayed !== '' || this.categoryPlayed !== null) {
      this.currentScore = 0;
      homeScreen.style.display = 'none';
      gameScreen.style.display = 'block';
    }
  }

  public onHigherClicked(): void {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] === this.categoryPlayed) {
        if (
          this.revealedMovie[
            this.categoryPlayed as keyof typeof this.revealedMovie
          ] <
          this.hiddenMovie[
            this.categoryPlayed as keyof typeof this.revealedMovie
          ]
        ) {
          this.correctAnswerClicked();
        } else {
          this.wrongAnswerClicked();
          alert(
            `Game ended with a score of: ${this.currentScore}\n${
              this.hiddenMovie.original_TITLE
            } has vote average of: ${
              this.hiddenMovie[
                this.categoryPlayed as keyof typeof this.revealedMovie
              ]
            }`
          );
        }
      }
    }
  }

  public onLowerClicked(): void {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] === this.categoryPlayed) {
        if (
          this.revealedMovie[
            this.categoryPlayed as keyof typeof this.revealedMovie
          ] >
          this.hiddenMovie[
            this.categoryPlayed as keyof typeof this.revealedMovie
          ]
        ) {
          this.correctAnswerClicked();
        } else {
          this.wrongAnswerClicked();
          alert(
            `Game ended with a score of: ${this.currentScore}\n${
              this.hiddenMovie.original_TITLE
            } has vote average of: ${
              this.hiddenMovie[
                this.categoryPlayed as keyof typeof this.revealedMovie
              ]
            }`
          );
        }
      }
    }
  }

  public correctAnswerClicked(): void {
    this.currentScore++;
    this.revealedMovie = this.hiddenMovie;
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
  }

  public wrongAnswerClicked(): void {
    this.gameOver = true;
    this.easyModeScore = this.currentScore;
    var gameScreen = document.getElementById('game-screen');
    var homeScreen = document.getElementById('home-screen');
    if (this.gameOver) {
      homeScreen.style.display = 'block';
      gameScreen.style.display = 'none';
    }
    this.gameOver = false;
  }
}
