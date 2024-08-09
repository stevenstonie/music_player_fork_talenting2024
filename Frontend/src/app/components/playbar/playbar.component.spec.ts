import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PlaybarComponent } from "./playbar.component";
import { provideHttpClient } from '@angular/common/http';

describe('PlaybarComponent', () => {
  let fixture: ComponentFixture<PlaybarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlaybarComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PlaybarComponent);
  })

  it('should create the component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  
});
