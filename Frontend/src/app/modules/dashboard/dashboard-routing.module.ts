import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '../../components/dashboard-page/dashboard-page.component';
import { ArtistPageComponent } from '../../components/artist-page/artist-page.component';
import { AlbumPageComponent } from '../../components/album-page/album-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path: 'album/:albumName',
    component: AlbumPageComponent,
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
