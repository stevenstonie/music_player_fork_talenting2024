import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MusicService } from '../../services/music-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-stream-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-stream-song.component.html',
  styleUrl: './test-stream-song.component.scss'
})
export class TestStreamSongComponent {
  songUrl: SafeUrl | null = null;

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) { }

  streamSong() {
    this.musicService.streamSong('hardcoded song name!!!!!!!!!').subscribe({
      next: response => {
        this.songUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response));

        console.log(response);
      },
      error: error => {
      }
    });
  }
}
