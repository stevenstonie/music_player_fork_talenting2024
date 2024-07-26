import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { API_ENDPOINT_BASE_PATH } from '../app.config';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly _musicPathKey = 'music';
  private readonly _albumPathKey = 'album';

  private currentSongSubject: BehaviorSubject<Song | null> = new BehaviorSubject<Song | null>(null);
  currentSong$: Observable<Song | null> = this.currentSongSubject.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentSong(song: Song): void {
    this.currentSongSubject.next(song);
  }

  // api calls ---------------------------------------------------------------

  getAlbumSongs(albumName: string): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_ENDPOINT_BASE_PATH}/${this._musicPathKey}/album/${albumName}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getMusicFiles(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_ENDPOINT_BASE_PATH}/${this._musicPathKey}/getAll`)
      .pipe(
        catchError(this.handleError)
      )
  }

  streamSong(fileName: string): Observable<Blob> {
    return this.http.get(`${API_ENDPOINT_BASE_PATH}/${this._musicPathKey}/stream/${fileName}`, { responseType: 'blob' })
      .pipe(
        // manage for error being an instance of Blob
        catchError(this.handleError)
      );
  }

  // ---------------------------------------------------

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
