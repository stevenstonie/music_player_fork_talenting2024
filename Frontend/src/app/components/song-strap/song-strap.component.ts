import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';
import { MusicService } from '../../services/music.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-strap',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './song-strap.component.html',
  styleUrl: './song-strap.component.scss',
})
export class SongStrapComponent {
  @Input() song!: Song;

  constructor(private musicService: MusicService, private router: Router) {
  }

  playSong(): void {
    this.musicService.setCurrentSong(this.song);
  }

  navigateToAlbumWindow(albumName: string): void {
    if (albumName == null) {
      alert('this song doesnt have an associated album.');
      return;
    }

    this.router.navigate(['/album', albumName]);
  }

  navigateToArtistWindow(artistName: string): void {
    if (artistName == null) {
      alert('this song doesnt have an associated artist.');
      return;
    }

    this.router.navigate(['/artist', artistName]);
  }

  getDurationStringFromSeconds(seconds: number): string {
    return Utils.getDurationStringFromSeconds(seconds);
  }
}
