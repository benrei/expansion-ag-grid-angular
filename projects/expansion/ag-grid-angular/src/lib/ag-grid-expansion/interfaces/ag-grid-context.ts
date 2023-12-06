import { AgGridToolbarAction } from './ag-grid-toolbar-action';

export interface AgGridContext {
  actions?: AgGridToolbarAction[];
  quickFilterText?: string;
}
