import { Component } from '@angular/core';
import { PlaybarComponent } from '../playbar/playbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SongListComponent } from '../song-list/song-list.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PlaybarComponent, SearchBarComponent, SongListComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
