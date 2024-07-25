import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music-service.service'; 
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SongCardComponent } from './song-card/song.component';
import { Song } from '../../models/song';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongCardComponent, CommonModule, MatGridListModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  musicFiles: Song[] = [];
  currentTrack: Song | null = null;

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.musicService.getMusicFiles().subscribe({
      next: (data) => {
        this.musicFiles = data.map(song => {
          if (song.imageData) {
            song.imageUrl = this.convertImageDataToUrlAndSanitize(song.imageData);
          }
          return song;
        });
      },
      error: (error) => {
        console.error('Error fetching songs:', error);
      }
    });
  }

  convertImageDataToUrlAndSanitize(imageData: Uint8Array): SafeUrl {
    const uint8Array = new Uint8Array(imageData);
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

    return imageUrl
  }

  playMusic(file: Song): void {
    this.currentTrack = file;
  }
}
