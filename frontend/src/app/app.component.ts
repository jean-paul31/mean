import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meanFront';
  isUserConnected: boolean = false;

    // Méthode pour mettre à jour l'état de connexion de l'utilisateur
  updateConnectionStatus(status: boolean): void {
    this.isUserConnected = status;
  }
}
