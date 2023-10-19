import { Injectable } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ServerSideDatasourceService } from './server-side-datasource.service';

@Injectable({ providedIn: 'root' })
export class GridOptionsService {
  constructor(
    private serverSideDatasourceService: ServerSideDatasourceService
  ) {}

  getDefaultColDef = (): ColDef => {
    return { editable: true, sortable: true };
  };

  core = (): GridOptions => {
    return {
      columnDefs: [
        { field: 'id', hide: true },
        { field: 'brand' },
        { field: 'model' },
        { field: 'price' },
      ],
      defaultColDef: this.getDefaultColDef(),
      enableCellChangeFlash: true,
      editType: 'fullRow',
      getRowId: (params) => {
        return params.data['id'];
      },
      rowSelection: 'single',
    };
  };

  clientSide = (): GridOptions => {
    return {
      ...this.core(),
      rowData: this.serverSideDatasourceService.generateItems(5),
      rowModelType: 'clientSide',
    };
  };

  serverSide = (): GridOptions => {
    return {
      ...this.core(),
      rowModelType: 'serverSide',
      serverSideDatasource:
        this.serverSideDatasourceService.createServerSideDatasource(100),
    };
  };
}
