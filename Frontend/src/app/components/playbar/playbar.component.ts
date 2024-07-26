import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MusicService } from '../../services/music-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Song } from '../../models/song';

@Component({
  selector: 'app-playbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './playbar.component.html',
  styleUrls: ['./playbar.component.scss'],
})
export class PlaybarComponent implements OnInit {
  songUrl: SafeUrl | null = null;
  songDurationInSeconds: number = 0;
  currentTimeInSeconds: number = 0;
  audio: HTMLAudioElement | null = null;
  currentSong!: Song;
  isUserChangingRange: boolean = false;

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.audio = new Audio();
    
    this.audio.addEventListener('timeupdate', () => {
      if (!this.isUserChangingRange) {
        this.currentTimeInSeconds = this.audio?.currentTime ?? 0;
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.songDurationInSeconds = this.audio?.duration ?? 0;
    });

    this.musicService.currentSong$.subscribe((song) => {
      if (song) {
        this.currentSong = song;
        this.streamSong(song);
      }
    });
  }

  streamSong(song: Song): void {
    this.musicService.streamSong(song.fileName).subscribe({
      next: (response) => {
        const audioUrl = URL.createObjectURL(response);
        this.songUrl = this.sanitizer.bypassSecurityTrustUrl(audioUrl);
        if (this.audio) {
          this.audio.src = audioUrl;
          this.audio.load();
          this.audio.play();
        }
      },
      error: (error) => {
        console.error('error streaming song: ', error);
      },
    });
  }

  playPauseSong(): void {
    if (this.audio) {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  }

  onRangeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isUserChangingRange = true;
    this.currentTimeInSeconds = parseFloat(input.value);
  }

  onRangeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newTime = parseFloat(input.value);
    if (this.audio && isFinite(newTime)) {
      this.audio.currentTime = newTime;
      this.currentTimeInSeconds = newTime;
    }
    this.isUserChangingRange = false;
  }

  formatLabel(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = Math.floor(value % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
