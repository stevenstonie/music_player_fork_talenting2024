import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
    selector: 'app-song-list',
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
