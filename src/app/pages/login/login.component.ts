import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
/* import { AuthService } from '../../services/auth.service'; */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<{
    usuario: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.nullValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.nullValidator,
        ],
      ],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const usuarioUpper =
      this.loginForm.get('usuario')?.value?.toUpperCase() || '';
    const password = this.loginForm.get('password')?.value || '';

    try {
      await this.authService.login(usuarioUpper, password);
      // La redirección se maneja en el servicio
    } catch (error: any) {
      console.error('Error de login:', error);
      this.errorMessage =
        'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
