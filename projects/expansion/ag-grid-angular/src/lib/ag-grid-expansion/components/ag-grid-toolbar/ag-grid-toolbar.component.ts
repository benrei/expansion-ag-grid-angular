import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'ag-grid-toolbar',
  templateUrl: './ag-grid-toolbar.component.html',
  styleUrls: ['./ag-grid-toolbar.component.scss'],
})
export class AgGridToolbarComponent {
  @Input() agGrid!: AgGridAngular;
  @Input() debounceSearch = 500;
  @Input() disableSearch = false;
  @Input() enableSearch = true;
  @Input() placeholderSearch = 'Search...';
}
