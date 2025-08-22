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
  // Opciones para los select
  informeOptions: SelectOption[] = [
    { value: 'informe1', label: 'Informe de Auditoría Q1 2024' },
    { value: 'informe2', label: 'Informe de Auditoría Q2 2024' },
    { value: 'informe3', label: 'Informe de Auditoría Q3 2024' },
  ];

  planOptions: SelectOption[] = [
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
  ];

  actividadOptions: SelectOption[] = [
    { value: 'ACTAUD', label: 'Actividades de Auditor' },
    { value: 'ACTCUMP', label: 'Actividades de Cumplimiento Normativo' },
    { value: 'ACTSEPS', label: 'Actividades Priorizadas SEPS' },
  ];

  // Fecha actual del sistema en formato YYYY-MM-DD
  fechaActual: string = new Date().toISOString().slice(0, 10);

  // Valores seleccionados
  informeSeleccionado: SelectOption | null = null;
  pertenecePlan: SelectOption | null = null;
  tipoActividad: SelectOption | null = null;

  // Estados para drag and drop
  isDragOverInforme = false;
  isDragOverActa = false;
  informeFile: File | null = null;
  actaFile: File | null = null;

  // Métodos para los select
  onInformeChange(option: SelectOption) {
    this.informeSeleccionado = option;
  }

  onPlanChange(option: SelectOption) {
    this.pertenecePlan = option;
  }

  onActividadChange(option: SelectOption) {
    this.tipoActividad = option;
  }

  // Métodos para drag and drop del informe
  onDragOverInforme(event: DragEvent) {
    event.preventDefault();
    this.isDragOverInforme = true;
  }

  onDragLeaveInforme(event: DragEvent) {
    event.preventDefault();
    this.isDragOverInforme = false;
  }

  onDropInforme(event: DragEvent) {
    event.preventDefault();
    this.isDragOverInforme = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0], 'informe');
    }
  }

  // Métodos para drag and drop del acta
  onDragOverActa(event: DragEvent) {
    event.preventDefault();
    this.isDragOverActa = true;
  }

  onDragLeaveActa(event: DragEvent) {
    event.preventDefault();
    this.isDragOverActa = false;
  }

  onDropActa(event: DragEvent) {
    event.preventDefault();
    this.isDragOverActa = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0], 'acta');
    }
  }

  // Método para manejar la subida de archivos
  private handleFileUpload(file: File, type: 'informe' | 'acta') {
    // Validar tipo de archivo
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten archivos PDF y DOCX');
      return;
    }

    // Validar tamaño (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB en bytes
    if (file.size > maxSize) {
      alert('El archivo no puede superar los 10MB');
      return;
    }

    // Asignar el archivo según el tipo
    if (type === 'informe') {
      this.informeFile = file;
    } else {
      this.actaFile = file;
    }

    console.log(`Archivo ${type} subido:`, file.name, file.size, file.type);
  }

  // Método para subir archivo mediante input file
  onFileSelected(event: Event, type: 'informe' | 'acta') {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.handleFileUpload(files[0], type);
    }
  }

  // Método para remover archivo
  removeFile(type: 'informe' | 'acta') {
    if (type === 'informe') {
      this.informeFile = null;
    } else {
      this.actaFile = null;
    }
  }

  // Método para obtener el nombre del archivo
  getFileName(type: 'informe' | 'acta'): string {
    const file = type === 'informe' ? this.informeFile : this.actaFile;
    return file ? file.name : '';
  }

  // Método para obtener el tamaño del archivo en formato legible
  getFileSize(type: 'informe' | 'acta'): string {
    const file = type === 'informe' ? this.informeFile : this.actaFile;
    if (!file) return '';

    const bytes = file.size;
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
