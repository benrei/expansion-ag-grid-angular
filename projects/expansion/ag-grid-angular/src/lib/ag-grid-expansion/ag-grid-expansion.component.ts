import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AgGridToolbarAction,
  AgGridToolbarActionEvent,
} from './interfaces/ag-grid-toolbar-action';
import { AgGridContext } from './interfaces/ag-grid-context';
import { actionsSets } from './actions-sets';

/**
 * Write some docs here
 *  */
@Component({
  selector: 'ag-grid-expansion',
  templateUrl: './ag-grid-expansion.component.html',
  styleUrls: ['./ag-grid-expansion.component.scss'],
})
export class AgGridExtensionComponent {
  @Input() actions: AgGridToolbarAction[] = actionsSets.standard;
  /** Debounce in ms for seach input */
  @Input() debounceSearch = 500;
  /** Enable search field*/
  @Input() enableSearch = true;
  /** Seach placeholdet text */
  @Input() placeholderSearch = 'Search...';

  context!: AgGridContext;

  @ContentChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private cdr: ChangeDetectorRef) {}

  get toolbarActionEvent(): AgGridToolbarActionEvent {
    return {
      api: this.agGrid.api,
      columnApi: this.agGrid.columnApi,
      context: this.context,
    };
  }

  ngAfterViewInit(): void {
    this.context = this.agGrid.context || this.agGrid.gridOptions?.context;
    // agGrid changes after initializing itself
    this.cdr.detectChanges();
  }
}
