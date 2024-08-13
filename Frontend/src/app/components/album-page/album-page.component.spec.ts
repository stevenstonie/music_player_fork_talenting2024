import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPageComponent } from './album-page.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../../models/song';
import { MusicService } from '../../services/music.service';

describe('AlbumPageComponent', () => {
  let component: AlbumPageComponent;
  let fixture: ComponentFixture<AlbumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'album1' } } } },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home button', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-home-button')).toBeTruthy();
  })

  it('should display an alert window if no artist is associated', () => {
    spyOn(window, 'alert');

    component.navigateToArtistWindow(null);
    component.navigateToArtistWindow(undefined);
    component.navigateToArtistWindow('');

    expect(window.alert).toHaveBeenCalledTimes(3);
  })

  it('should NOT display an alert window and should navigate to artist page if artist is associated', () => {
    let router: Router;
    router = TestBed.inject(Router);

    spyOn(window, 'alert');
    spyOn(router, 'navigate');

    component.navigateToArtistWindow('artist1');

    expect(window.alert).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/artist', 'artist1']);
  });

  it('should assign a default image for a song with a corrupt cover', () => {
    const song = {
      fileName: 'song1.mp3',
      creationDate: new Date(),
      isLiked: false,
      rating: 0,
      duration: 0,
      imageUrl: 'bad image'
    } as Song;

    component.handleImageError(song);

    expect(song.imageUrl).toBe('assets/default-song-image.png');
  })
});
