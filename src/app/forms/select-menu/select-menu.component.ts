import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectMenuComponent {
  @Input() options: SelectOption[] = [];
  @Input() label = 'Seleccionar';
  @Input() placeholder = 'Seleccione una opción';
  @Output() selectionChange = new EventEmitter<SelectOption>();

  isOpen = false;
  selectedOption?: SelectOption;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption): void {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
