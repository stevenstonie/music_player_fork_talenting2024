import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music-service.service';
import { CommonModule } from '@angular/common';
import { SongCardComponent } from './song-card/song.component';
import { Song } from '../../models/song';
import { MusicUtils } from '../utils/music-utils';

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
          song.imageUrl = MusicUtils.getImageUrl(
            song.imageData != null ? song.imageData.toString() : null);

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
