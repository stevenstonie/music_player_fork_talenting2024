import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-song-card',
    templateUrl: './song-card.component.html',
    styleUrls: ['./song-card.component.css']
})
export class SongCardComponent {
    @Input() song: any;
    @Output() playSong = new EventEmitter<void>();

    onPlaySong(): void {
        this.playSong.emit();
    }
}
