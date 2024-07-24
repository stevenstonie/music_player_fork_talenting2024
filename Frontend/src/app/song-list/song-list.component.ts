import { Component, OnInit, Inject } from '@angular/core';
import { MusicService } from '../services/music-service.service'; 
import { SongCardComponent } from '../song-card/song-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SongCardComponent, CommonModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  musicFiles: any[] = [];
  currentTrack: any = null;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.getMusicFiles().subscribe(files => {
      this.musicFiles = files;
    });
  }

  playMusic(file: any): void {
    this.currentTrack = file;
  }
}
