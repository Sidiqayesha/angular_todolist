import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosComponent } from './todos/todos.component';
import { AddTodosComponent } from './add-todos/add-todos.component';
import { MatDialogModule } from '@angular/material/dialog';
import{ MatFormFieldModule } from '@angular/material/form-field';
import{ MatButtonModule } from '@angular/material/button';
import{ MatInputModule } from '@angular/material/input';
import{ BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodosComponent,
    AddTodosComponent,
    UpdateTodoComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
