import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() show = false;
  @Input() message = 'Por favor, ingrese un valor válido.';
}
