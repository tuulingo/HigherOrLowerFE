import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { lastValueFrom } from 'rxjs';

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
  public isHardMode: Boolean = false;
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

  public async getMovie(movieId: number): Promise<void> {
    // can't put inside for loop - endless while loop
    const movie = await this.movieService.getMovie(movieId);
    const response = await lastValueFrom(movie);
    if (this.revealedMovie === null || this.revealedMovie === undefined) {
      this.revealedMovie = response;
    } else {
      this.hiddenMovie = response;
    }
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] === this.categoryPlayed) {
        while (
          this.revealedMovie[
            this.categoryPlayed as keyof typeof this.revealedMovie
          ] ===
            this.hiddenMovie[
              this.categoryPlayed as keyof typeof this.hiddenMovie
            ] ||
          this.hiddenMovie.revenue === 0
        ) {
          const movie = await this.movieService.getMovie(
            Math.round(Math.random() * this.totalMoviesCount)
          );
          const response = await lastValueFrom(movie);
          this.hiddenMovie = response;
        }
      }
    }
  }

  public async getMovies() {
    const movies = await this.movieService.getMovies();
    const response = await lastValueFrom(movies);
    this.movies = response;
    this.totalMoviesCount = this.movies.length;
  }

  public onClickCategory(category: string): void {
    this.revealedMovie = undefined;
    this.hiddenMovie = undefined;
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    this.categoryPlayed = category;
    var homeScreen = document.getElementById('home-screen');
    var gameScreen = document.getElementById('game-screen');
    var hardModeSlider = document.getElementById(
      'hardModeSlider'
    ) as HTMLInputElement;
    if (this.categoryPlayed !== '' || this.categoryPlayed !== null) {
      if (hardModeSlider.checked) {
        this.isHardMode = true;
      } else {
        this.isHardMode = false;
      }
      homeScreen.style.display = 'none';
      if (gameScreen !== null) {
        gameScreen.style.display = 'block';
      }
      this.currentScore = 0;
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
            } has value of: ${
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
            } has value of: ${
              this.hiddenMovie[
                this.categoryPlayed as keyof typeof this.revealedMovie
              ]
            }`
          );
        }
      }
    }
  }

  public async correctAnswerClicked(): Promise<void> {
    this.currentScore++;
    this.revealedMovie = this.hiddenMovie;
    await this.getMovie(Math.round(Math.random() * this.totalMoviesCount));
    if (this.isHardMode) {
      switch (this.categoryPlayed) {
        case 'vote_AVERAGE':
          while (
            !this.between(
              this.hiddenMovie.vote_AVERAGE,
              this.revealedMovie.vote_AVERAGE - 0.5,
              this.revealedMovie.vote_AVERAGE + 0.5
            )
          ) {
            await this.getMovie(
              Math.round(Math.random() * this.totalMoviesCount)
            );
          }
          break;
        case 'popularity':
          while (
            !this.between(
              this.hiddenMovie.popularity,
              this.revealedMovie.popularity - 5,
              this.revealedMovie.popularity + 5
            )
          ) {
            await this.getMovie(
              Math.round(Math.random() * this.totalMoviesCount)
            );
          }
          break;
        case 'runtime':
          while (
            !this.between(
              this.hiddenMovie.runtime,
              this.revealedMovie.runtime - 15,
              this.revealedMovie.runtime + 15
            )
          ) {
            await this.getMovie(
              Math.round(Math.random() * this.totalMoviesCount)
            );
          }
          break;
        case 'revenue':
          while (
            !this.between(
              this.hiddenMovie.revenue,
              this.revealedMovie.revenue - 15000000,
              this.revealedMovie.revenue + 15000000
            )
          ) {
            await this.getMovie(
              Math.round(Math.random() * this.totalMoviesCount)
            );
          }
          break;
      }
    }
  }

  public wrongAnswerClicked(): void {
    this.gameOver = true;
    if (this.isHardMode && this.hardModeScore < this.currentScore) {
      this.hardModeScore = this.currentScore;
    }
    if (!this.isHardMode && this.easyModeScore < this.currentScore) {
      this.easyModeScore = this.currentScore;
    }
    var gameScreen = document.getElementById('game-screen');
    var homeScreen = document.getElementById('home-screen');
    if (this.gameOver) {
      homeScreen.style.display = 'block';
      gameScreen.style.display = 'none';
    }
    this.gameOver = false;
  }

  public between(categoryValue: number, min: number, max: number): boolean {
    return min <= categoryValue && categoryValue <= max;
  }
}
