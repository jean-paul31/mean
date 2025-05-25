import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserConnected: boolean = this.authService.isAuthenticated;

  constructor(private authService: AuthService, private router: Router) {}


  // Méthode pour se déconnecter
  logout(): void {
    this.authService.logout();  // Méthode de déconnexion dans AuthService
    this.isUserConnected = false;
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }

  // Méthode pour mettre à jour l'état de la connexion (si besoin)
  updateConnectionStatus(status: boolean) {
    this.isUserConnected = status;
  }
}
