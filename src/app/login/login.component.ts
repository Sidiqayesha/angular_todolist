import { Component } from '@angular/core';
import { ToDoService } from '../service/to-do.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  // user = { username: '', password: '' };
 

  constructor(private fb: FormBuilder, private todoService: ToDoService,private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.todoService.login(this.loginForm.value).subscribe(
      response => {
        console.log('Login successful', response);
        alert('Login successful');
        
        this.router.navigate(["/dashboard"]);
      },
      error => {
        alert('invalid Credentials')
        this.loginFailed=true;
        console.error('Login failed', error);
      }
    );
  }
}