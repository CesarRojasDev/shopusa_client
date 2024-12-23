import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopusa-sidebar-item',
  templateUrl: './sidebar-item.component.html',
})
export class SidebarItemComponent {
  @Input() title: string = ''; // Título del ítem
  @Input() routeList: string = ''; // Ruta para 'Listado'
  @Input() routeCreate: string = ''; // Ruta para 'Crear'
  @Input() isOpen: boolean = false; // Estado de abierto/cerrado
  @Input() toggleVisibility: () => void = () => {}; // Función para alternar visibilidad

  @Input() public showList: boolean = true; // Indica si se muestra el enlace 'Listado'
  // Método para alternar el estado
  toggle() {
    this.toggleVisibility();
  }
}
