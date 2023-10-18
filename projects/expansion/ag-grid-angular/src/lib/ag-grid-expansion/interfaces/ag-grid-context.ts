import { IRowNode } from 'ag-grid-community';

import { AgGridEvent } from './ag-grid-event';
import { AgGridFilters } from './ag-grid-filters';

export interface AgGridContext<TData = any> {
  /** Used by `suppressKeyboardEvent` on key `delete` press etc */
  deleteFn?: (IRowNode: IRowNode<TData>) => void;
  /** Tells grid what entity it's working with. Often used by `getRows` endpoint */
  entity?: string;
  /** Extra filters added on top of standard grid filters. Often used in `getRows` request */
  externalFilters?: AgGridFilters;
  /** An arrow function to load client side data. Used by `reload` toolbar action */
  reloadData?: (event?: AgGridEvent<TData>) => void;
  /** Grid global serach text. Used by server-side grid's datasource to add same `quickFilter` functionality as ag-grids client-side `quickFilter` */
  quickFilterText?: string;
  /** Object of keyboard keys to suppress. `key` must match `params.event.key` */
  // suppressKeyboard?: {
  //   [key: string]: (params: SuppressKeyboardEventParams<TData>) => boolean;
  // };
  /** Total row count for server-side grids. Used by `RowCountStatusPanel` */
  totalCount?: number;
}
