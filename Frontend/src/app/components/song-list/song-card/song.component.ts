import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export class SongCardComponent {
  @Input() song: any;
  @Output() playSong = new EventEmitter<void>();

  onPlaySong(): void {
    this.playSong.emit();
  }
}
