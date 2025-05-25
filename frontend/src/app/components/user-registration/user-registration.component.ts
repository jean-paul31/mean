import { Component } from '@angular/core';
import { UserService } from "../../services/user/user.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  name: string = '';
  mdp: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.mdp || !this.email) {
      this.errorMessage = 'Tous les champs sont requis.';
      return;
    }
    
  
    const user = { name: this.name, mdp: this.mdp, email: this.email };
    console.log('📤 Données envoyées au backend :', user); 
    this.userService.addUser(user).subscribe({
      next: (response) => {
        console.log('✅ Utilisateur créé avec succès', response);
        this.name = '';
        this.mdp = '';
        this.email = '';
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('❌ Erreur lors de la création de l\'utilisateur', error);
      
        if (error.status === 400) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          // Ajoute des logs pour diagnostiquer
          console.error('Statut HTTP :', error.status);
          console.error('Message serveur :', error.error?.message || error.message);
        }
      }
    });
  }
  
}