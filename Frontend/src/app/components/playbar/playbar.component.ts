import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-playbar',
  standalone: true,
  imports: [MatIconModule, MatSliderModule, MatButtonModule],
  templateUrl: './playbar.component.html',
  styleUrl: './playbar.component.scss',
})
export class PlaybarComponent {
  songDurationInSeconds: number = 3 * 60 + 14;

  formatLabel(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;

    const formattedSeconds: string =
      seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${formattedSeconds}`;
  }
}
