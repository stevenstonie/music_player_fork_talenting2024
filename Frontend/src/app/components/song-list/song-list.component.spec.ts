import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListComponent } from './song-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;

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
});
