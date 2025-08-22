import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ObservacionesComponent } from './pages/observaciones/observaciones.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PlanAccionComponent } from './pages/plan-accion/plan-accion.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';

export const routes: Routes = [
  { path: '', redirectTo: 'observaciones', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'observaciones',
        component: ObservacionesComponent,
      },
      {
        path: 'plan-accion',
        component: PlanAccionComponent,
      },
      {
        path: 'seguimiento',
        component: SeguimientoComponent,
      },
    ],
  },
];
