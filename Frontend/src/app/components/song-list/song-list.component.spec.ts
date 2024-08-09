import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListComponent } from './song-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song';

describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;
  const hardCodedSongs: Song[] = returnHardCodedSongs();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled).toBeTruthy();
  })

  it('should get songs when initialized', () => {
    const musicService = TestBed.inject(MusicService);
    spyOn(musicService, 'getMusicFiles').and.returnValue(of(hardCodedSongs));
    spyOn(component, 'getSongsFromLocal').and.callThrough();

    component.ngOnInit();

    expect(component.getSongsFromLocal).toHaveBeenCalled();
    expect(musicService.getMusicFiles).toHaveBeenCalled();
    expect(component.songs).toEqual(hardCodedSongs);
  })

  it('should render the song card component as many times as there are songs', () => {
    component.songs = hardCodedSongs;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-song-card')).toHaveSize(2);
  })

  it('should NOT render the song card component if there are no songs', () => {
    component.songs = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-song-card')).toBeFalsy();
  })
});

function returnHardCodedSongs(): Song[] {
  return [
    {
      title: 'test song 1',
      fileName: "",
      creationDate: new Date(),
      isLiked: false,
      rating: 0,
      duration: 0
    },
    {
      title: 'test song 2',
      fileName: "",
      creationDate: new Date(),
      isLiked: false,
      rating: 0,
      duration: 0
    },
  ];
}