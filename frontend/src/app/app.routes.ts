import { Routes } from '@angular/router';
import { UserListComponent } from "../app/components/user-list/user-list.component";
import { HomeComponent } from "../app/components/home/home.component";
import { TaskListComponent } from "../app/components/task-list/task-list/task-list.component";
import { UserRegistrationComponent } from "../app/components/user-registration/user-registration.component";
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"home", component:HomeComponent},
    {path:"login", component: LoginComponent},
    {path:"users", component:UserListComponent},
    {path:"tasks", component:TaskListComponent},
    {path:"profile", component:ProfileComponent},
    {path:"registration", component: UserRegistrationComponent}
];
