import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../../models/song';
import { MusicService } from '../../../services/music.service';
import { Utils } from '../../utils/utils';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() song!: Song;
  currentSong$: Observable<Song | null>;

  constructor(private musicService: MusicService, private router: Router) {
    this.currentSong$ = this.musicService.currentSong$;
  }

  playSong(): void {
    console.log('playing song: ', this.song);
    this.musicService.setCurrentSong(this.song);
  }

  navigateToAlbumWindow(albumName: string): void {
    if (albumName == null) {
      alert('this song doesnt have an associated album.');
      return;
    }

    window.open(`/album/${albumName}`, '_blank');
  }

  navigateToArtistWindow(artistName: string): void {
    if (artistName == null) {
      alert('this song doesnt have an associated artist.');
      return;
    }

    window.open(`/artist/${artistName}`, '_blank');
  }

  getDurationStringFromSeconds(seconds: number): string {
    return Utils.getDurationStringFromSeconds(seconds);
  }

  handleImageError(song: Song): void {
    song.imageUrl = Utils.handleImageError(song.imageUrl!);
  }
}
