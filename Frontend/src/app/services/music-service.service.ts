import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_ENDPOINT_BASE_PATH } from '../app.config';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly _musicUrl = 'music';

  constructor(private http: HttpClient){}

  getMusicFiles(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_ENDPOINT_BASE_PATH}/${this._musicUrl}/getAll`)
      .pipe(
        catchError(this.handleError)
      )
  }

  streamSong(fileName: string): Observable<Blob> {
    return this.http.get(`${API_ENDPOINT_BASE_PATH}/${this._musicUrl}/stream/${fileName}`, { responseType: 'blob' })
      .pipe(
        // manage for error being an instance of Blob
        catchError(this.handleError)
      );
  }

  // ---------------------------------------------------

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error( error.message ));
  }
}
