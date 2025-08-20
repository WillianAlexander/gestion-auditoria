import { Component } from '@angular/core';
import { SelectMenuComponent } from '../../forms/select-menu/select-menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [SelectMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
