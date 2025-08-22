import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectControlService {
  // Observable que emite el ID del select actualmente abierto
  private openSelectId = new BehaviorSubject<string | null>(null);
  
  // Observable público para suscribirse
  public openSelectId$ = this.openSelectId.asObservable();

  // Método para abrir un select
  openSelect(selectId: string): void {
    this.openSelectId.next(selectId);
  }

  // Método para cerrar un select
  closeSelect(selectId: string): void {
    if (this.openSelectId.value === selectId) {
      this.openSelectId.next(null);
    }
  }

  // Método para cerrar todos los selects
  closeAllSelects(): void {
    this.openSelectId.next(null);
  }

  // Método para verificar si un select específico está abierto
  isSelectOpen(selectId: string): boolean {
    return this.openSelectId.value === selectId;
  }

  // Método para obtener el ID del select abierto
  getOpenSelectId(): string | null {
    return this.openSelectId.value;
  }
}
