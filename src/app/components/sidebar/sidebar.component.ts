import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Estado del sidebar para móviles
  isSidebarOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  // Método para abrir/cerrar el sidebar en móviles
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Método para cerrar el sidebar en móviles
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  cerrarSesion() {
    // Usar el método logout del AuthService
    this.authService.logout();
  }
}
