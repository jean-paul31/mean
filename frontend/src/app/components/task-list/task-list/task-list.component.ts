import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  newTaskTitle: string = ''; // Remplace taskTitle par newTaskTitle
  assignedTo: string = '';   // Propriété pour l'utilisateur assigné
  users: any[] = [];         // Liste des utilisateurs récupérée du backend
  tasks: any[] = [];         // Liste des tâches récupérée du backend

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit(): void {
    this.LoadUsers();
    this.loadTasks();

    
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks
    });
  }

  LoadUsers(): void {
    this.userService.getUsers().subscribe(users =>{ 
      this.users = users
    })
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTask = { title: this.newTaskTitle, assignedTo: this.assignedTo || null };
    
    this.taskService.createTask(newTask).subscribe(() => {
      this.newTaskTitle = ''; // Réinitialiser le champ de saisie
      this.assignedTo = '';   // Réinitialiser l'assignation
      this.loadTasks();       // Recharger la liste des tâches
    });
  }

  toggleTaskCompletion(task: any): void {
    this.taskService.updateTask(task._id, !task.completed).subscribe(updatedTask => {
      task.completed = updatedTask.completed;
      console.log(task.completed);
      if (task.completed) {
        // Attendre 10 secondes avant de supprimer la tâche
        setTimeout(() => {
          this.deleteTask(task._id);
          window.location.reload();
        }, 3000); // 10000 millisecondes = 10 secondes
      }
    }, error => {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
}
