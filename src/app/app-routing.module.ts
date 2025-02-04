import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"dashboard",
    component:TodosComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path: '', redirectTo: '/register', pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
