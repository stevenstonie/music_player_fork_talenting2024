import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../../models/song';
import { MusicService } from '../../../services/music.service';
import { Utils } from '../../utils/utils';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss'],
})
export class SongCardComponent {
  @Input() song!: Song;
  favoriteSong: boolean = false;
  currentSong$: Observable<Song | null>;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.currentSong$ = this.musicService.currentSong$;
  }

  playSong(): void {
    this.musicService.setCurrentSong(this.song);
  }

  toggleFavorite(): void {
    this.favoriteSong = !this.favoriteSong;
  }

  navigateToAlbumWindow(albumName: string): void {
    if (!albumName) {
      this.openDialog("This song doesn't have an associated album.");
      return;
    }

    this.router.navigate(['/album', albumName]);
  }

  navigateToArtistWindow(artistName: string): void {
    if (!artistName) {
      this.openDialog("This song doesn't have an associated artist.");
      return;
    }

    this.router.navigate(['/artist', artistName]);
  }

  getDurationStringFromSeconds(seconds: number): string {
    return Utils.getDurationStringFromSeconds(seconds);
  }

  handleImageError(song: Song): void {
    song.imageUrl = Utils.handleImageError(song.imageUrl!);
  }

  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: { message },
    });
  }
}
