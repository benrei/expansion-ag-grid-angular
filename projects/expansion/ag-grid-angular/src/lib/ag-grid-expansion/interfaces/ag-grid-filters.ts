import {
  DateFilterModel,
  NumberFilterModel,
  TextFilterModel,
} from 'ag-grid-community';
import { ISimpleFilterModelType } from 'ag-grid-community/dist/lib/filter/provided/simpleFilter';

export interface AgGridFilters {
  [key: string]: AgGridFilter;
}

export interface AgGridFilter {
  condition1?: TextFilterModel | NumberFilterModel | DateFilterModel;
  condition2?: TextFilterModel | NumberFilterModel | DateFilterModel;
  /** Format: YYYY-MM-DD hh:mm:ss */
  dateFrom?: string | null;
  /** Format: YYYY-MM-DD hh:mm:ss */
  dateTo?: string | null;
  filterType?: 'date' | 'number' | 'set' | 'text';
  /** Value to filter by */
  filter?: boolean | number | string | null;
  operator?: 'AND' | 'OR';
  /**
   * - Date - default: `equals`
   * - Number - default: `equals`
   * - Text - default: `contains`
   *
   * See docs: https://www.ag-grid.com/angular-data-grid/filter-provided-simple/#simple-filter-options */
  type?: ISimpleFilterModelType;
  /** Instead of `filter` property when `filterType = 'set'` */
  values?: any[];
}
