import { Component, Input } from '@angular/core';

@Component({
  selector: 'layout-page',
  templateUrl: './layout-page.component.html',
  styles: `@keyframes moveWave {
  0% {
    background-position: 0 bottom;
  }
  100% {
    background-position: 100% bottom;
  }
}
.bg-wave {
  background-image: url('/wave_3.svg');
  background-repeat: repeat-x;
  background-position: bottom;
  background-size: auto 100%;
  animation: moveWave 30s ease-in-out infinite alternate;
}
`
})
export class LayoutPageComponent {
  @Input() title: string = '';
}
