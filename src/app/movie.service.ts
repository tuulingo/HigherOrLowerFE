import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiServerUrl = environment.APIBASEURL

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}/movie/all`)
  }

  public getMovie(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiServerUrl}/movie/find/${movieId}`)
  }
}
