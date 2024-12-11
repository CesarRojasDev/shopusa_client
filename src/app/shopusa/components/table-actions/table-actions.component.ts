import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopusa-table-actions',
  templateUrl: './table-actions.component.html',
})
export class TableActionsComponent { 
  @Input() title: string = '';
}
