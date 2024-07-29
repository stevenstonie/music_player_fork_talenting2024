import { Component } from '@angular/core';
import { PlaybarComponent } from '../playbar/playbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SongListComponent } from '../song-list/song-list.component';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PlaybarComponent, SearchBarComponent, SongListComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  filteredSongs: Song[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.loadSongs();
    this.musicService.getMusicFiles().subscribe((songs) => {
      this.filteredSongs = songs;
    });
  }

  onSearch(searchData: { title: string }): void {
    this.filteredSongs = this.musicService.searchSongs(searchData.title);
  }
}
