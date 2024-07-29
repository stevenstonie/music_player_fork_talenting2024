import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss'
})
export class HomeButtonComponent {

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
