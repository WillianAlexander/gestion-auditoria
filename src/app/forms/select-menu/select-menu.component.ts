import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
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
})
export class SelectMenuComponent implements OnInit, OnDestroy {
  @Input() options: SelectOption[] = [];
  @Input() label = 'Seleccionar';
  @Input() placeholder = 'Seleccione una opción';
  @Output() selectionChange = new EventEmitter<SelectOption>();

  isOpen = false;
  selectedOption?: SelectOption;

  // Detectar click fuera del componente
  ngOnInit() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  ngOnDestroy() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log(target);
    const selectMenu = document.getElementById('select-menu-root');
    if (this.isOpen && selectMenu && !selectMenu.contains(target)) {
      this.closeDropdown();
    }
  };

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
