import { Routes } from '@angular/router';
import { UserListComponent } from "../app/components/user-list/user-list.component";
import { HomeComponent } from "../app/components/home/home.component";
import { TaskListComponent } from "../app/components/task-list/task-list/task-list.component";

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"home", component:HomeComponent},
    {path:"users", component:UserListComponent},
    {path:"tasks", component:TaskListComponent}
];
