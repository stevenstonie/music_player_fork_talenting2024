import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-songs-list',
  templateUrl: './album-songs-list.component.html',
  styleUrls: ['./album-songs-list.component.scss']
})
export class AlbumSongsListComponent implements OnInit {
  album: Album | null = null;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('albumId');
    if (albumId) {
      this.albumService.getAlbumDetails(albumId).subscribe((album) => {
        this.album = album;
      });
    }
  }

  playSong(songId: string): void {
  }
}