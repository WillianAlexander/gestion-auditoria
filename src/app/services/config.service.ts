import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // API Configuration
  get apiUrl(): string {
    return environment.apiUrl;
  }

  get authorization(): string {
    return environment.authorization;
  }

  // App Configuration
  get appName(): string {
    return environment.appName;
  }

  get version(): string {
    return environment.version;
  }

  get isProduction(): boolean {
    return environment.production;
  }

  // Métodos helper
  getApiEndpoint(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  getLoginEndpoint(): string {
    return this.getApiEndpoint('LoginCore');
  }

  // Para debugging en desarrollo
  logConfig(): void {
    if (!this.isProduction) {
      console.log('🔧 App Configuration:', {
        apiUrl: this.apiUrl,
        appName: this.appName,
        version: this.version,
        production: this.isProduction,
      });
    }
  }
}
