import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled).toBeTruthy();
  });

  it('should render the search bar and song list components', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-search-bar')).toBeTruthy();
    expect(compiled.querySelector('app-song-list')).toBeTruthy();
  })
});
