import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongStrapComponent } from './song-strap.component';

describe('SongStrapComponent', () => {
  let component: SongStrapComponent;
  let fixture: ComponentFixture<SongStrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongStrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongStrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
