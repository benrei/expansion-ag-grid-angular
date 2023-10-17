import { AgGridToolbarAction } from './interfaces/ag-grid-toolbar-action';
import * as pkg from 'projects/expansion/ag-grid-angular/package.json';

export const presetActions: {
  [key in
    | 'export'
    | 'fit'
    | 'reload'
    | 'reset'
    | 'redo'
    | 'undo']: AgGridToolbarAction;
} = {
  export: {
    icon: 'file_download',
    tooltip: 'Export as csv',
    clickFn: ({ api }) => {
      api.exportDataAsCsv();
    },
  },
  fit: {
    icon: 'view_column',
    tooltip: 'Fit columns',
    clickFn: ({ api }) => {
      api.sizeColumnsToFit();
    },
  },
  /** Requires `context.reloadData` arrow function for client-side */
  reload: {
    icon: 'refresh',
    tooltip: 'Reload data',
    clickFn: (params) => {
      const { api, context } = params;
      const rowModelType = api.getModel().getType();
      if (rowModelType === 'clientSide') {
        if (context?.reloadData) {
          context.reloadData(params);
        } else {
          console.warn(`${pkg.name}: 'context.reloadData()' not defined`);
        }
      } else if (rowModelType === 'serverSide') {
        api.refreshServerSide({ route: [], purge: true });
      }
    },
  },
  redo: {
    icon: 'redo',
    tooltip: 'Redo',
    clickFn: ({ columnApi }) => {
      columnApi.resetColumnState();
    },
  },
  reset: {
    icon: 'restart_alt',
    tooltip: 'Reset columns',
    clickFn: ({ columnApi }) => {
      columnApi.resetColumnState();
    },
  },
  undo: {
    icon: 'undo',
    tooltip: 'Undo',
    clickFn: ({ columnApi }) => {
      columnApi.resetColumnState();
    },
  },
};

export const actionsSets = {
  redoUndo: [presetActions.redo, presetActions.undo],
  standard: [
    presetActions.reset,
    presetActions.fit,
    presetActions.reload,
    {},
    presetActions.export,
  ],
  utility: [presetActions.reset, presetActions.fit, presetActions.reload],
};
