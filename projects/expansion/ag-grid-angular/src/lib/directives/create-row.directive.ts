import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  GridApi,
  ColumnApi,
  IRowNode,
  AgGridEvent,
  RowValueChangedEvent,
  RowModelType,
} from 'ag-grid-community';
import * as pkg from 'projects/expansion/ag-grid-angular/package.json';

@Directive({ selector: '[agCreateRow]' })
export class CreateRowDirective implements OnInit {
  /** Flash rows added to the grid by the create row */
  @Input() enableFlashInsertedRows = false;
  /** Entity id field. Useful when having `getRowId` to give CreationRow a propper node id
   *
   * See ag-grid docs: [getRowId](https://www.ag-grid.com/angular-data-grid/grid-options/#reference-rowModels-getRowId)
   */
  @Input() idField = 'id';
  /** Useful for grid sensitive to sorting */
  @Input() suppressPostSortRows = false;

  /**Event triggered when create row is initialized */
  @Output() creationRowReady = new EventEmitter<CreationRowEvent>();
  /** Event triggered when create row is reset */
  @Output() creationRowReset = new EventEmitter<CreationRowEvent>();
  /** Event triggered when row was inserted to grid from CreationRow */
  @Output() rowInserted = new EventEmitter<CreationRowEvent>();

  private addCount = 0;
  constructor(private agGrid: AgGridAngular) {
    this.agGrid.editType = 'fullRow';
  }

  get editType(): RowModelType {
    return this.agGrid.api.getModel().getType();
  }

  ngOnInit(): void {
    if (!this.suppressPostSortRows) {
      this.agGrid.postSortRows = ({ nodes }) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === CREATE_ROW) {
            nodes.splice(nodes.length - 1, 0, nodes.splice(i, 1)[0]);
          }
        }
      };
    }
  }

  @HostListener('firstDataRendered', ['$event'])
  @HostListener('rowDataUpdated', ['$event'])
  rowDataUpdated(event: AgGridEvent) {
    this.addCreateRow(event);
  }

  private addCreateRow(event: AgGridEvent<any, any>) {
    // Ignore if already added
    if (event.api.getRowNode(CREATE_ROW)) return;
    const type = event.api.getModel().getType();
    switch (type) {
      case 'clientSide':
        this.createClientSideCreateRow(event);
        break;
      default:
        console.warn(`${pkg.name}: ${type} not supported`);
        break;
    }
  }

  @HostListener('rowValueChanged', ['$event'])
  rowValueChanged(event: RowValueChangedEvent): void {
    const { api, columnApi, data, node } = event;
    if (node.id === CREATE_ROW) {
      if (!data[this.idField]) {
        data[this.idField] = `${CREATE_ROW}-${this.addCount}`;
      }
      const transaction = api.applyTransaction({
        add: [data],
        addIndex: node.rowIndex!,
      });
      if (transaction) {
        if (this.enableFlashInsertedRows) {
          api.flashCells({ rowNodes: transaction.add });
        }
        this.addCount++;
        this.rowInserted.emit(this.buildEvent(transaction.add[0]));
      }
      // Reset CREATE_ROW
      const columns = columnApi.getAllDisplayedColumns();
      const firstEditColumn = columns.find((c) => c.isCellEditable(node));
      api.getCellRanges()?.length ? api.clearRangeSelection() : null;
      api.setFocusedCell(node.rowIndex!, firstEditColumn || columns[0]);
      node.setData(null);
      this.creationRowReset.emit(this.buildEvent(node));
    }
  }

  private createClientSideCreateRow({ api }: AgGridEvent): void {
    /** Sets `node.id = 'CREATION_ROW'` even when `agGrid.getRowId` is used */
    const creationRowData = { [this.idField]: CREATE_ROW };
    const transaction = api.applyTransaction({ add: [creationRowData] });
    const node = transaction!.add[0];
    node.setData(null);
    node.id = CREATE_ROW;
    this.creationRowReady.emit(this.buildEvent(node));
  }

  private buildEvent(node: IRowNode): CreationRowEvent {
    const { api, columnApi, context, gridOptions } = this.agGrid;
    return { api, columnApi, context: context || gridOptions?.context, node };
  }
}

export const CREATE_ROW = 'CREATE_ROW';

export interface CreationRowEvent {
  api: GridApi;
  columnApi: ColumnApi;
  context: any;
  node: IRowNode;
}
