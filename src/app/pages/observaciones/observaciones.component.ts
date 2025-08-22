import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMenuComponent } from '../../forms/select-menu/select-menu.component';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-observaciones',
  standalone: true,
  imports: [CommonModule, SelectMenuComponent],
  templateUrl: './observaciones.component.html',
  styleUrl: './observaciones.component.css',
})
export class ObservacionesComponent {
  // Opciones para el select de Informe No
  informeOptions: SelectOption[] = [
    { value: '0011F', label: '0011F' },
    { value: '0012F', label: '0012F' },
    { value: '0013F', label: '0013F' }
  ];

  // Opciones para el select de Pertenece al Plan
  planOptions: SelectOption[] = [
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' }
  ];

  // Opciones para el select de Tipo de Actividad
  actividadOptions: SelectOption[] = [
    { value: 'AUDITOR', label: 'ACTIVIDADES DE AUDITOR' },
    { value: 'CONSULTOR', label: 'ACTIVIDADES DE CONSULTOR' }
  ];

  // Valores seleccionados
  informeSeleccionado?: SelectOption;
  pertenecePlan?: SelectOption;
  tipoActividad?: SelectOption;

  // Métodos para manejar los cambios de selección
  onInformeChange(option: SelectOption): void {
    this.informeSeleccionado = option;
    console.log('Informe seleccionado:', option);
  }

  onPlanChange(option: SelectOption): void {
    this.pertenecePlan = option;
    console.log('Plan seleccionado:', option);
  }

  onActividadChange(option: SelectOption): void {
    this.tipoActividad = option;
    console.log('Actividad seleccionada:', option);
  }
}
