import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { API_ENDPOINT_BASE_PATH } from '../app.config';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly _musicPathKey = 'music';
  private readonly _albumPathKey = 'album';

  private songs: Song[] = [];
  private currentSongSubject: BehaviorSubject<Song | null> =
    new BehaviorSubject<Song | null>(null);
  currentSong$: Observable<Song | null> =
    this.currentSongSubject.asObservable();
  currentSongIndex: number = 0;

  constructor(private http: HttpClient) {}

  setCurrentSong(song: Song): void {
    const index = this.songs.findIndex((s) => s.title === song.title);
    if (index !== -1) {
      this.currentSongIndex = index;
      this.currentSongSubject.next(this.songs[this.currentSongIndex]);
    }
  }

  setNextSong(): void {
    if (this.songs.length > 0) {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.currentSongSubject.next(this.songs[this.currentSongIndex]);
    }
  }

  setPreviousSong(): void {
    if (this.songs.length > 0) {
      this.currentSongIndex =
        (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.currentSongSubject.next(this.songs[this.currentSongIndex]);
    }
  }

  loadSongs(): void {
    this.getMusicFiles().subscribe({
      next: (songs: Song[]) => {
        this.songs = songs;
      },
      error: (error) => {
        console.error('Error loading songs:', error);
      },
    });
  }

  // api calls ---------------------------------------------------------------

  getAlbumSongs(albumName: string): Observable<Song[]> {
    return this.http
      .get<Song[]>(
        `${API_ENDPOINT_BASE_PATH}/${this._musicPathKey}/album/${albumName}`
      )
      .pipe(catchError(this.handleError));
  }

  getMusicFiles(): Observable<Song[]> {
    return this.http
      .get<Song[]>(`${API_ENDPOINT_BASE_PATH}/${this._musicPathKey}/getAll`)
      .pipe(catchError(this.handleError));
  }

  streamSong(fileName: string): Observable<Blob> {
    return this.http
      .get(
        `${API_ENDPOINT_BASE_PATH}/${this._musicPathKey}/stream/${fileName}`,
        { responseType: 'blob' }
      )
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
