import { AgGridEvent } from 'ag-grid-community';

export interface AgGridToolbarAction<TData = any, TContext = any> {
  /** Action color */
  color?: string;
  /** Default: `false`. */
  disabled?: boolean;
  /** If no icon is provided, the `ToolbarAction` will be treated as a separator. */
  icon?: string;
  /** ID for toolbar action, used to set html id. */
  id?: string;
  /** tooltip translated text. */
  tooltip?: string;
  /** Arrow function to execute on click. */
  clickFn?: (event: AgGridEvent<TData, TContext>) => void;
}
