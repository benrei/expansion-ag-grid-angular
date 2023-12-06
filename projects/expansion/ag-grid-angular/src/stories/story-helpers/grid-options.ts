import { AgGridEvent } from 'ag-grid-community';
import { AgGridContext } from '../../public-api';
import { DatasourceService } from './datasource.service';
import { GridOptionsService } from './grid-options.service';

const datasourceService = new DatasourceService();
const gridOptionsService = new GridOptionsService();
export const gridOptions = gridOptionsService.clientSide();
gridOptions.rowSelection = 'multiple';
gridOptions.columnDefs = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    minWidth: 35,
    suppressCellFlash: true,
    width: 35,
  },
  ...gridOptionsService.getColDefs(),
];
gridOptions.rowData = datasourceService.generateItems(15);
gridOptions.onSelectionChanged = (event: AgGridEvent<any, AgGridContext>) => {
  const { api, context } = event;
  const nodes = api.getSelectedNodes();
  const deleteAction = context.actions?.find(({ icon }) => icon === 'delete');
  if (deleteAction) {
    if (nodes.length) {
      deleteAction.disabled = false;
    } else {
      deleteAction.disabled = true;
    }
  }
};
gridOptions.onCellValueChanged = (event: AgGridEvent<any, AgGridContext>) => {
  const { api, context } = event;
  const redoAction = context.actions?.find(({ icon }) => icon === 'redo');
  const undoAction = context.actions?.find(({ icon }) => icon === 'undo');
  if (redoAction) {
    if (api.getCurrentRedoSize()) {
      redoAction.disabled = false;
    } else {
      redoAction.disabled = true;
    }
  }
  if (undoAction) {
    if (api.getCurrentUndoSize()) {
      undoAction.disabled = false;
    } else {
      undoAction.disabled = true;
    }
  }
};
