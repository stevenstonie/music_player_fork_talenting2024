import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';
import { ActivatedRoute, Router } from '@angular/router';
import { SongStrapComponent } from "../song-strap/song-strap.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule, SongStrapComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss'
})
export class ArtistPageComponent implements OnInit {
  topRatedSongs: Song[] = [];
  albums: string[] = [];
  artistName: string | null = null;

  constructor(private musicService: MusicService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.artistName = this.route.snapshot.paramMap.get('artistName');
    if (this.artistName) {
      this.musicService.getTopRatedSongsAndAllAlbums(this.artistName).subscribe((artistDetails) => {
        this.topRatedSongs = artistDetails.topRatedSongs;
        this.albums = artistDetails.albums;
      });
    }
  }

  navigateToAlbumPage(albumName: string): void {
    if (albumName == null) {
      alert('this song doesnt have an associated album.');
      return;
    }

    this.router.navigate(['/album', albumName]);
  }
}
