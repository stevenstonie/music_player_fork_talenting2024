import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from '../utils/utils';
import { CommonModule } from '@angular/common';
import { DEFAULT_SONG_IMAGE_PATH } from '../../app.config';
import { PlaybarComponent } from "../playbar/playbar.component";
import { SongStrapComponent } from "../song-strap/song-strap.component";
import { HomeButtonComponent } from "../home-button/home-button.component";


@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, PlaybarComponent, SongStrapComponent, HomeButtonComponent],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss'
})
export class AlbumPageComponent implements OnInit {
  songs: Song[] = [];

  constructor(private route: ActivatedRoute, private musicService: MusicService, private router: Router) { }

  ngOnInit(): void {
    const albumName = this.route.snapshot.paramMap.get('albumName');
    if (albumName) {
      this.musicService.getAlbumSongs(albumName).subscribe((songs) => {
        this.songs = songs.map(song => {
          song.imageUrl = Utils.getImageUrlOrDefault(
            song.imageData != null ? song.imageData.toString() : null, DEFAULT_SONG_IMAGE_PATH);

          return song;
        });
      });
    }
  }

  navigateToArtistWindow(artistName: string | undefined | null): void {
    if (artistName == null || artistName == undefined || artistName.trim() == '') {
      alert('this song doesnt have an associated artist.');
      return;
    }

    this.router.navigate(['/artist', artistName]);
  }

  handleImageError(song: Song): void {
    console.log('handleImageError: ', song);
    song.imageUrl = Utils.handleImageError();
  }
}