import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private songs: Song[] = [
    {
      fileName: 'song1.mp3',
      title: 'Shape of You',
      creationDate: new Date('2017-01-06'),
      album: '÷ (Divide)',
      isLiked: true,
      artist: 'Ed Sheeran',
      rating: 4.5,
      duration: 263,
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song2.mp3',
      title: 'Blinding Lights',
      creationDate: new Date('2019-11-29'),
      album: 'After Hours',
      isLiked: true,
      artist: 'The Weeknd',
      rating: 4.8,
      duration: 200, // in seconds
      image: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36',
    },
    {
      fileName: 'song3.mp3',
      title: 'Someone Like You',
      creationDate: new Date('2011-01-24'),
      album: '21',
      isLiked: false,
      artist: 'Adele',
      rating: 4.7,
      duration: 285, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song4.mp3',
      title: 'Bad Guy',
      creationDate: new Date('2019-03-29'),
      album: 'When We All Fall Asleep, Where Do We Go?',
      isLiked: true,
      artist: 'Billie Eilish',
      rating: 4.6,
      duration: 194, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song5.mp3',
      title: 'Old Town Road',
      creationDate: new Date('2019-12-03'),
      album: '7 EP',
      isLiked: false,
      artist: 'Lil Nas X',
      rating: 4.4,
      duration: 157, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song6.mp3',
      title: 'Rolling in the Deep',
      creationDate: new Date('2010-11-29'),
      album: '21',
      isLiked: true,
      artist: 'Adele',
      rating: 4.9,
      duration: 228, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song7.mp3',
      title: 'Uptown Funk',
      creationDate: new Date('2014-11-10'),
      album: 'Uptown Special',
      isLiked: true,
      artist: 'Mark Ronson ft. Bruno Mars',
      rating: 4.7,
      duration: 269, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song8.mp3',
      title: 'Havana',
      creationDate: new Date('2017-08-03'),
      album: 'Camila',
      isLiked: true,
      artist: 'Camila Cabello ft. Young Thug',
      rating: 4.5,
      duration: 217, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song9.mp3',
      title: 'Closer',
      creationDate: new Date('2016-07-29'),
      album: 'Collage',
      isLiked: false,
      artist: 'The Chainsmokers ft. Halsey',
      rating: 4.4,
      duration: 244, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
    {
      fileName: 'song10.mp3',
      title: 'Sunflower',
      creationDate: new Date('2018-10-18'),
      album: 'Spider-Man: Into the Spider-Verse',
      isLiked: true,
      artist: 'Post Malone, Swae Lee',
      rating: 4.6,
      duration: 158, // in seconds
      image:
        'https://images.genius.com/3710c6f28a35a0635d3e54ea30a8fc5c.1000x1000x1.png',
    },
  ];

  getMusicFiles(): Observable<any[]> {
    return of(this.songs);
  }
}
