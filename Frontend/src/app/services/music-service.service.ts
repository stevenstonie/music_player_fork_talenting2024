import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musicFiles = [
    { title: 'Song 1', url: 'path/to/song1.mp3' },
    { title: 'Song 2', url: 'path/to/song2.mp3' },
  ];

  getMusicFiles(): Observable<any[]> {
    return of(this.musicFiles);
  }
}
