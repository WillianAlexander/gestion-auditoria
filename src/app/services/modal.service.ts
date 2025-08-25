import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  private modalAbierto = new BehaviorSubject<boolean>(false);
  modalAbierto$ = this.modalAbierto.asObservable();

  abrir() {
    this.modalAbierto.next(true);
    console.log('accion abrir: ' + this.modalAbierto.value);
  }
  cerrar() {
    this.modalAbierto.next(false);
    console.log('accion cerrar: ' + this.modalAbierto.value);
  }
}
