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
  const editAction = context.actions?.find(({ icon }) => icon === 'edit');
  if (deleteAction) {
    deleteAction.disabled = nodes.length === 0;
  }
  if (editAction) {
    editAction.disabled = nodes.length === 0;
  }
};
gridOptions.onCellValueChanged = (event: AgGridEvent<any, AgGridContext>) => {
  const { api, context } = event;
  const redoAction = context.actions?.find(({ icon }) => icon === 'redo');
  const undoAction = context.actions?.find(({ icon }) => icon === 'undo');
  if (redoAction) {
    redoAction.disabled = api.getCurrentRedoSize() === 0;
  }
  if (undoAction) {
    undoAction.disabled = api.getCurrentUndoSize() === 0;
  }
};
