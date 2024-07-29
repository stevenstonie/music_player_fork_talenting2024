import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '../../components/dashboard-page/dashboard-page.component';
import { AlbumSongsListComponent } from '../../components/album-songs-list/album-songs-list.component';
import { ArtistPageComponent } from '../../components/artist-page/artist-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path: 'album/:albumName',
    component: AlbumSongsListComponent,
  },
  {
    path: 'artist/:artistName',
    component: ArtistPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
