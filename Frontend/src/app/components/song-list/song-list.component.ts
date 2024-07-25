import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music-service.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SongCardComponent } from './song-card/song.component';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongCardComponent, CommonModule, MatGridListModule],
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
          song.imageUrl = this.getImageUrl(song.imageData?.toString());
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

  // ---------------------------------------------------

  getImageUrl(base64Image: string | undefined): string {
    return base64Image ? `data:image/jpeg;base64,${base64Image}` : `assets/default-song-image.png`;
  }
}
