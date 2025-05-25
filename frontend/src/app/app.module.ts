import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { AuthService } from "./services/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    UserService,
    TaskService,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
