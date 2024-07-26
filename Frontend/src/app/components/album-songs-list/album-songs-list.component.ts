import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-album-songs-list',
  templateUrl: './album-songs-list.component.html',
  styleUrls: ['./album-songs-list.component.scss']
})
export class AlbumSongsListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private route: ActivatedRoute, private musicService: MusicService) { }

  ngOnInit(): void {
    const albumName = this.route.snapshot.paramMap.get('albumName');
    if (albumName) {
      this.musicService.getAlbumSongs(albumName).subscribe((songs) => {
        this.songs = songs;

        console.log('songs: ', this.songs);
      });
    }
  }

  playSong(songId: string): void {
  }
}