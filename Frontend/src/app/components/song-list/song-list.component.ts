import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { CommonModule } from '@angular/common';
import { SongCardComponent } from './song-card/song-card.component';
import { Song } from '../../models/song';
import { Utils } from '../utils/utils';
import { DEFAULT_SONG_IMAGE_PATH } from '../../app.config';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongCardComponent, CommonModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  currentTrack: Song | null = null;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.getSongsFromLocal();
  }

  getSongsFromLocal(): void {
    this.musicService.getMusicFiles().subscribe({
      next: (data) => {
        this.songs = data.map(song => {
          song.imageUrl = Utils.getImageUrlOrDefault(
            song.imageData != null ? song.imageData.toString() : null, DEFAULT_SONG_IMAGE_PATH);

          return song;
        });
      },
      error: (error) => {
        console.error('Error fetching songs:', error);
      }
    });
  }

  playMusic(file: Song): void {
    this.currentTrack = file;
  }
}
