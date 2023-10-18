import { GridOptions } from 'ag-grid-community';
import { AgGridContext } from './ag-grid-context';

/** Ag-grid `GridOptions` including typed `context` */
export interface AgGridOptions<TData = any> extends GridOptions<TData> {
  /** Shared contextual information to be passed around in the grid */
  context?: AgGridContext<TData>;
}
