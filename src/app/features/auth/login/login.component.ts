import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginResponse } from '../../../core/models/employee.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // if user enter direct login without touched any input will appear this error in validation html 
      return; // will return and no complete
    }
    this.loading = true; // no anyone create request ..button will be disable
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.form.getRawValue();  // get values from form
    this.auth.login({ email, password }).subscribe({


      next: (res: LoginResponse) => {
        this.loading = false;

        // عرض رسالة النجاح من الـ backend
        if (res?.message) {
          this.successMessage = res.message; // مثال: "Login successful"
        }

        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Login failed';

      },

    });
  }
}
