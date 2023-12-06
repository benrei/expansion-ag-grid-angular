import { Injectable } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class GridOptionsService {
  getDefaultColDef = (): ColDef => {
    return { editable: true, sortable: true };
  };

  getColDefs = (): ColDef[] => [
    { field: 'id', width: 50 },
    { field: 'brand' },
    { field: 'model' },
    { field: 'price', width: 90 },
    { field: 'isNew', width: 70 },
  ];

  core = (): GridOptions => {
    return {
      defaultColDef: this.getDefaultColDef(),
      enableCellChangeFlash: true,
      getRowId: (params) => {
        return params.data['id'];
      },
      rowSelection: 'single',
      undoRedoCellEditing: true,
    };
  };

  clientSide = (): GridOptions => {
    return {
      ...this.core(),
      rowModelType: 'clientSide',
    };
  };

  serverSide = (): GridOptions => {
    return {
      ...this.core(),
      rowModelType: 'serverSide',
    };
  };
}
