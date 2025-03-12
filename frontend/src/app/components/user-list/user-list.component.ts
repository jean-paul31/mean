import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";
import { TaskService } from "../../services/task.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  tasks: any[]= []; // Stocke la liste des utilisateurs
  newUser = { name: '', email: '' }; // ✅ Définit l'objet pour le formulaire

  constructor(private userService: UserService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log("✅ Utilisateurs récupérés :", data);
        this.users = data;
      },
      (error) => console.error("❌ Erreur lors de la récupération des utilisateurs", error)
    );
    this.getUsers();
  }

  toggleTaskCompletion(task: any): void {
    this.taskService.updateTask(task._id, !task.completed).subscribe(updatedTask => {
      task.completed = updatedTask.completed;
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
  
  getUsers() {
    this.userService.getUsersWithTasks().subscribe(
      (data) => {
        this.users = data;
        console.log("Utilisateurs avec tâches :", this.users);
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    );
  }

  addUser(): void { // ✅ Ajoute cette méthode
    if (!this.newUser.name || !this.newUser.email) {
      console.error("❌ Nom et email obligatoires !");
      return;
    }

    this.userService.addUser(this.newUser).subscribe(
      (user) => {
        console.log("✅ Utilisateur ajouté :", user);
        this.users.push(user); // Met à jour la liste
        this.newUser = { name: '', email: '' }; // Réinitialise le formulaire
      },
      (error) => console.error("❌ Erreur lors de l'ajout de l'utilisateur", error)
    );
  }

  deleteUser(userId: string): void {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }
  
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log(`✅ Utilisateur ${userId} supprimé`);
        this.users = this.users.filter(user => user._id !== userId); // Mise à jour de la liste
      },
      (error) => console.error("❌ Erreur lors de la suppression de l'utilisateur", error)
    );
  }
  
}
