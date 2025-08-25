import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';
import { SelectMenuComponent } from '../../forms/select-menu/select-menu.component';
import { AsyncPipe, NgIf } from '@angular/common';

interface SelectOption {
  value: string;
  label: string;
}

interface Registro {
  observacion: string;
  area: string;
  impacto: string;
  probabilidad: string;
  nivel: string;
}

@Component({
  selector: 'app-maintenance-modal',
  imports: [SelectMenuComponent, NgIf, AsyncPipe],
  templateUrl: './maintenance-modal.component.html',
  styleUrl: './maintenance-modal.component.css',
})
export class MaintenanceModalComponent {
  isOpen: Observable<boolean>;
  filas: Registro[] = [];

  areas: SelectOption[] = [
    { value: '1', label: 'Tecnología' },
    { value: '2', label: 'Soporte y calidad' },
    { value: '3', label: 'Talento Humano' },
    { value: '4', label: 'Comunicación y responsablidad social' },
  ];

  impacto: SelectOption[] = [
    { value: '1', label: 'Insignificante' },
    { value: '2', label: 'Catastrofico' },
  ];

  probabilidad: SelectOption[] = [
    { value: '1', label: 'Muy baja' },
    { value: '2', label: 'Baja' },
    { value: '3', label: 'Media' },
    { value: '4', label: 'Alta' },
    { value: '5', label: 'Muy alta' },
  ];

  niveles: SelectOption[] = [
    { value: '1', label: 'Bajo' },
    { value: '2', label: 'Medio' },
    { value: '3', label: 'Alto' },
    { value: '4', label: 'Crítico' },
  ];

  constructor(private modalService: ModalService) {
    this.isOpen = this.modalService.modalAbierto$;
    this.agregarFila(); // agregamos 1 fila inicial
    console.log(this.isOpen);
  }

  cerrar() {
    this.modalService.cerrar();
  }

  agregarFila() {
    this.filas.push({
      observacion: '',
      area: '',
      impacto: '',
      probabilidad: '',
      nivel: '',
    });
  }
}
