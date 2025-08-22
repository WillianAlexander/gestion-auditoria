import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectControlService } from '../../services/select-control.service';
import { Subscription } from 'rxjs';

interface SelectOption {
  value: string;
  label: string;
  imagen?: string;
}

@Component({
  selector: 'app-select-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-menu.component.html',
})
export class SelectMenuComponent implements OnInit, OnDestroy {
  @Input() options: SelectOption[] = [];
  @Input() label = 'Seleccionar';
  @Input() placeholder = 'Seleccione una opción';
  @Input() selectId = ''; // ID único para cada select
  @Output() selectionChange = new EventEmitter<SelectOption>();

  isOpen = false;
  selectedOption?: SelectOption;
  private subscription: Subscription = new Subscription();

  constructor(private selectControlService: SelectControlService) {
    // Generar ID único si no se proporciona
    if (!this.selectId) {
      this.selectId = 'select-' + Math.random().toString(36).substr(2, 9);
    }
  }

  ngOnInit() {
    // Suscribirse a cambios en el servicio
    this.subscription.add(
      this.selectControlService.openSelectId$.subscribe(openId => {
        // Si otro select se abre, cerrar este
        if (openId !== this.selectId) {
          this.isOpen = false;
        }
      })
    );

    // Detectar click fuera del componente
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const selectMenu = document.getElementById(this.selectId + '-root');
    if (this.isOpen && selectMenu && !selectMenu.contains(target)) {
      this.closeDropdown();
    }
  };

  toggleDropdown(): void {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    // Notificar al servicio que este select se está abriendo
    this.selectControlService.openSelect(this.selectId);
    this.isOpen = true;
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.selectControlService.closeSelect(this.selectId);
  }

  selectOption(option: SelectOption): void {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.closeDropdown();
  }
}
