import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PlaybarComponent } from "./playbar.component";
import { provideHttpClient } from '@angular/common/http';

describe('PlaybarComponent', () => {
  let fixture: ComponentFixture<PlaybarComponent>;
  let component: PlaybarComponent;

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
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled).toBeTruthy();
  });
});
