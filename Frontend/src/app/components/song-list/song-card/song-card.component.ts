import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../../models/song';
import { MusicService } from '../../../services/music.service';
import { Utils } from '../../utils/utils';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() song!: Song;
  favoriteSong: boolean = false;
  currentSong$: Observable<Song | null>;

  constructor(private musicService: MusicService, private router: Router) {
    this.currentSong$ = this.musicService.currentSong$;
  }

  playSong(): void {
    this.musicService.setCurrentSong(this.song);
  }

  toggleFavorite(): void {
    this.favoriteSong = !this.favoriteSong;
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

    window.open(`/artist/${artistName}`, '_blank');
  }

  getDurationStringFromSeconds(seconds: number): string {
    return Utils.getDurationStringFromSeconds(seconds);
  }

  handleImageError(song: Song): void {
    song.imageUrl = Utils.handleImageError(song.imageUrl!);
  }
}
