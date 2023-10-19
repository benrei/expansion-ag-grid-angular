import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridExtensionComponent } from './ag-grid-expansion.component';
import { AgGridToolbarComponent } from './components/ag-grid-toolbar/ag-grid-toolbar.component';
import { AgGridToolbarActionComponent } from './components/ag-grid-toolbar-action/ag-grid-toolbar-action.component';
import { AgGridToolbarSearchComponent } from './components/ag-grid-toolbar-search/ag-grid-toolbar-search.component';

@NgModule({
  declarations: [
    AgGridExtensionComponent,
    AgGridToolbarComponent,
    AgGridToolbarActionComponent,
    AgGridToolbarSearchComponent,
  ],
  exports: [AgGridExtensionComponent, AgGridToolbarActionComponent],
  imports: [CommonModule],
})
export class AgGridExpansionModule {}
