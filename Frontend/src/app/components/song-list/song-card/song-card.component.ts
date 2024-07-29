import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../../models/song';
import { MusicService } from '../../../services/music.service';
import { Utils } from '../../utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() song!: Song;

  constructor(private musicService: MusicService) { }

  playSong(): void {
    console.log('playing song: ', this.song);
    this.musicService.setCurrentSong(this.song);
  }

  navigateToAlbumWindow(albumName: string): void {
    if (albumName == null) {
      alert('add a dialog window here');
      return;
    }

    window.open(`/album/${albumName}`, '_blank');
  }

  handleImageError(song: Song): void {
    song.imageUrl = Utils.handleImageError(song.imageUrl!);
  }
}
