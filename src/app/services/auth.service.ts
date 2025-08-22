import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { firstValueFrom } from 'rxjs';

interface LoginResponse {
  ok: boolean;
  messages: string[];
  data: {
    nombreLegal: string;
    identifiacion: string;
    email: string;
    // token: string;
    payload: {
      usuario: string;
      sessionTime: string;
      sessionId: string;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private currentUser: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService // Inyectamos el servicio de configuración
  ) {
    // Verificar si hay una sesión guardada
    this.initializeAuth();

    // Log de configuración en desarrollo
    this.configService.logConfig();
  }

  async login(usuario: string, password: string): Promise<any> {
    try {
      const response: LoginResponse = await firstValueFrom(
        this.http.post<LoginResponse>(
          this.configService.getLoginEndpoint(),
          {
            usuario,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.configService.authorization,
            },
          }
        )
      );

      console.log('Login response', response);

      // Si el login es exitoso, establecer el estado de autenticación
      this.isLoggedIn = response.ok;
      this.currentUser = {
        usuario,
        nombres: response.data.nombreLegal,
        timestamp: response.data.payload.sessionTime,
      }; // Limita datos sensibles

      if (!this.isLoggedIn) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      // Guarda en sessionStorage con expiración
      const expiry = new Date().getTime() + 3600000; // 1 hora
      sessionStorage.setItem(
        'sessionData',
        JSON.stringify({
          isLoggedIn: this.isLoggedIn,
          currentUser: this.currentUser,
          expiry,
        })
      );

      // Redirigir al dashboard
      await this.router.navigate(['/observaciones']);

      return response.data;
    } catch (error) {
      this.isLoggedIn = false;
      this.currentUser = null;
      throw error;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    sessionStorage.removeItem('sessionData');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Verificar tanto el estado en memoria como en localStorage
    const storedAuth = sessionStorage.getItem('sessionData');
    return this.isLoggedIn || storedAuth !== null;
  }

  getCurrentUser(): any {
    if (this.currentUser) {
      return this.currentUser;
    }

    this.initializeAuth(); // Asegura validez
    return this.currentUser;
  }

  // Método para inicializar el servicio al cargar la aplicación
  initializeAuth(): void {
    const storedData = sessionStorage.getItem('sessionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.expiry > new Date().getTime()) {
        // Verifica expiración
        this.isLoggedIn = data.isLoggedIn;
        this.currentUser = data.currentUser;
      } else {
        this.logout(); // Expira sesión
      }
    }
  }
}
