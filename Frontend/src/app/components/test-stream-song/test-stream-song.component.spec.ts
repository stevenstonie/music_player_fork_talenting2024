import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStreamSongComponent } from './test-stream-song.component';

describe('TestStreamSongComponent', () => {
  let component: TestStreamSongComponent;
  let fixture: ComponentFixture<TestStreamSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStreamSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStreamSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
