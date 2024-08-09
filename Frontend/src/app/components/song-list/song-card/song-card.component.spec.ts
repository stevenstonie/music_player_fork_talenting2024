import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCardComponent } from './song-card.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SongCardComponent', () => {
  let component: SongCardComponent;
  let fixture: ComponentFixture<SongCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongCardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SongCardComponent);
    component = fixture.componentInstance;
    component.song = {
      fileName: 'led zeppelin dazed and confused.mp3', title: 'dazed and confused', creationDate: new Date(), album: 'Led Zeppelin I', isLiked: false, rating: 0, artist: 'Led Zeppelin', duration: 0, imageData: undefined, imageUrl: "vecfw"
    };
    fixture.detectChanges();
  });

  it('should create the component', async () => {
    expect(component).toBeTruthy();
  })

  it('should open dialog window when no album or artist is associated', () => {
    component.song = {
      fileName: 'song without and album / artist', title: 'a title', creationDate: new Date(), album: '', isLiked: false, rating: 0, artist: '', duration: 0, imageData: undefined, imageUrl: "vecfw"
    };
    spyOn(component, 'openDialog').and.callThrough();

    component.navigateToAlbumWindow(component.song.album!);
    component.navigateToArtistWindow(component.song.artist!);

    expect(component.openDialog).toHaveBeenCalledTimes(2);
  })
});
