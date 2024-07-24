import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { API_ENDPOINT_BASE_PATH } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly _musicUrl = 'music';

  private musicFiles = [
    { title: 'Song 1', url: 'path/to/song1.mp3' },
    { title: 'Song 2', url: 'path/to/song2.mp3' },
  ];

  constructor(private http: HttpClient){}

  getMusicFiles(): Observable<any[]> {
    return of(this.musicFiles);
  }

  streamSong(fileName: string): Observable<Blob> {
    return this.http.get(`${API_ENDPOINT_BASE_PATH}/${this._musicUrl}/stream/${fileName}`, { responseType: 'blob' })
      .pipe(
        // manage edge case for error being an instance of Blob
        catchError(this.handleError)
      );
  }

  // ---------------------------------------------------

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error());
  }
}
