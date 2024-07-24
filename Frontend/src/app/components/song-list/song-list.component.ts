import { Component, OnInit, Inject } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SongCardComponent } from './song-card/song.component';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongCardComponent, CommonModule, MatGridListModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  musicFiles: any[] = [];
  currentTrack: any = null;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getMusicFiles().subscribe((files) => {
      this.musicFiles = files;
    });
  }

  playMusic(file: any): void {
    this.currentTrack = file;
  }
}
