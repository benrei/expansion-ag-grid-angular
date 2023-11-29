import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

let timer: any;
@Component({
  selector: 'ag-grid-toolbar-search',
  templateUrl: './ag-grid-toolbar-search.component.html',
  styleUrls: ['./ag-grid-toolbar-search.component.scss'],
})
export class AgGridToolbarSearchComponent {
  @Input() agGrid!: AgGridAngular;
  @Input() debounceTime = 500;
  @Input() disabled = false;
  @Input() placeholder = 'Search...';

  get context(): { quickFilterText: string } {
    return this.agGrid.context || this.agGrid.gridOptions?.context;
  }

  onSearch({ target }: any) {
    const { api } = this.agGrid;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const type = api.getModel().getType();
      if (type === 'serverSide') {
        this.setQuickFilter(target.value);
        api.onFilterChanged();
      } else {
        api.setQuickFilter(target.value);
        this.setQuickFilter(target.value);
      }
      if (
        this.agGrid.gridOptions?.rowSelection !== 'multiple' &&
        this.agGrid.rowSelection !== 'multiple'
      ) {
        api.deselectAll();
      }
    }, this.debounceTime);
  }

  setQuickFilter(term: string) {
    if (this.context) {
      this.context.quickFilterText = term;
    }
  }
}
