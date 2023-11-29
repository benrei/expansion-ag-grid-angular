import { AgGridToolbarAction } from './interfaces/ag-grid-toolbar-action';

export const presetActions: {
  [key in 'export' | 'fit' | 'reset' | 'redo' | 'undo']: AgGridToolbarAction;
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
  redo: {
    icon: 'redo',
    tooltip: 'Redo',
    clickFn: ({ api }) => {
      api.resetColumnState();
    },
  },
  reset: {
    icon: 'restart_alt',
    tooltip: 'Reset columns',
    clickFn: ({ api }) => {
      api.resetColumnState();
    },
  },
  undo: {
    icon: 'undo',
    tooltip: 'Undo',
    clickFn: ({ api }) => {
      api.resetColumnState();
    },
  },
};

export const actionsSets = {
  redoUndo: [presetActions.redo, presetActions.undo],
  standard: [presetActions.reset, presetActions.fit, {}, presetActions.export],
};
