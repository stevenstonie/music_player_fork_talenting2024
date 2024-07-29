import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from '../utils/utils';
import { CommonModule } from '@angular/common';
import { DEFAULT_SONG_IMAGE_PATH } from '../../app.config';
import { PlaybarComponent } from "../playbar/playbar.component";
import { SongStrapComponent } from "./song-strap/song-strap.component";


@Component({
  selector: 'app-album-songs-list',
  templateUrl: './album-songs-list.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, PlaybarComponent, SongStrapComponent],
  styleUrls: ['./album-songs-list.component.scss']
})
export class AlbumSongsListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private route: ActivatedRoute, private musicService: MusicService) { }

  ngOnInit(): void {
    const albumName = this.route.snapshot.paramMap.get('albumName');
    if (albumName) {
      this.musicService.getAlbumSongs(albumName).subscribe((songs) => {
        this.songs = songs.map(song => {
          song.imageUrl = Utils.getImageUrlOrDefault(
            song.imageData != null ? song.imageData.toString() : null, DEFAULT_SONG_IMAGE_PATH);
        this.songs = songs.map(song => {
          song.imageUrl = Utils.getImageUrlOrDefault(
            song.imageData != null ? song.imageData.toString() : null, DEFAULT_SONG_IMAGE_PATH);

          return song;
        });
          return song;
        });
      });
    }
  }

  handleImageError(song: Song): void {
    console.log('handleImageError: ', song);
    song.imageUrl = Utils.handleImageError(song.imageUrl!);
  }
}