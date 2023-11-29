import { GridApi } from 'ag-grid-community';
import { AgGridContext } from './ag-grid-context';

export interface AgGridEvent<TData = any> {
  api: GridApi<TData>;
  context: AgGridContext<TData>;
}
