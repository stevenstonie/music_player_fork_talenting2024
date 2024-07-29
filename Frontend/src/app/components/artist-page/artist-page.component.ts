import { Component } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss'
})
export class ArtistPageComponent {
  topRatedSongs: Song[] = [];
  albums: string[] = [];

  constructor(private musicService: MusicService) {
    
  }
}
