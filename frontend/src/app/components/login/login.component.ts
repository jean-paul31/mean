import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  mdp: string = '';
  isUserConnected: boolean = false;

  updateConnectionStatus(status: boolean) {
    this.isUserConnected = status;
  }

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté dès le démarrage
    this.isUserConnected = this.authService.isAuthenticated;
  }
  
    onSubmit(): void {
      // Vérifier que l'email et le mot de passe ne sont pas vides
      if (!this.email || !this.mdp) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
    
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(this.email)) {
        alert('Veuillez entrer un email valide.');
        return;
      }
    
      // Appeler la méthode login de authService
      this.authService.login(this.email, this.mdp).subscribe({
        next: (response) => {
          console.log('✅ Réponse reçue:', response);
          if (response.message === 'Connexion réussie') {
            this.authService.setUser(response.user);
            this.router.navigate(['/home']);
          } else {
            alert('Email ou mot de passe incorrect');
          }
        },
        error: (err) => {
          console.error('Erreur de connexion:', err);
          
          if (err.status === 401) {
            alert('Email ou mot de passe incorrect.');
          } else if (err.status === 500) {
            alert('Erreur interne du serveur. Veuillez réessayer plus tard.');
          } else {
            alert('Une erreur est survenue. Veuillez réessayer.');
          }
        }        
      }
      
    );
    this.isUserConnected = true;
    }
}
