import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlaybarComponent } from "./components/playbar/playbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SongListComponent, PlaybarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Frontend';
}
