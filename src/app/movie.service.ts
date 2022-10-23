import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiServerUrl = environment.APIBASEURL;

  constructor(private http: HttpClient) {}

  public async getMovies(): Promise<Observable<Movie[]>> {
    return await this.http.get<Movie[]>(`${this.apiServerUrl}/movie/all`);
  }

  public async getMovie(movieId: number): Promise<Observable<Movie>> {
    return await this.http.get<Movie>(
      `${this.apiServerUrl}/movie/find/${movieId}`
    );
  }
}
