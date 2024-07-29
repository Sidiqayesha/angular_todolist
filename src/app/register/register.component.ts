import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToDoService } from '../service/to-do.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationFailed: boolean = false;
  errorMessage: string = '';
  usernameMessage: string = '';

  constructor(private fb: FormBuilder,private todoService: ToDoService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  validatePassword(control: any) {
    const password = control.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      return { invalidPassword: true };
    }
    return null;
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, role } = this.registerForm.value;
  
      // Check username availability
      this.todoService.checkUsernameAvailability(username).subscribe(
        isAvailable => {
          if (!isAvailable) { 
            this.usernameMessage = 'Username already exists';
          } else {
            // Register user if username is available
            this.todoService.register({ username, password, role }).subscribe(
              response => {
                  alert('Registration successful!');
                  console.log(response);  
                  // Redirect to success page or home
                  this.router.navigate(['/login']);
              },
              error => {
                this.registrationFailed = true;
                this.errorMessage = 'An error occurred during registration.';
                console.error('Registration error:', error);
              }
            );
          }
        },
        error => {
          console.error('Username availability check error:', error);
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }
}  