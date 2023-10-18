import { Component, Input } from '@angular/core';

@Component({
  selector: 'ag-grid-toolbar-action',
  templateUrl: './ag-grid-toolbar-action.component.html',
  styleUrls: ['./ag-grid-toolbar-action.component.scss'],
})
export class AgGridToolbarActionComponent {
  @Input() color?: string;
  @Input() disabled?: boolean;
  /** ID for toolbar action, used to set html id */
  @Input() id?: string;
  /** Icon name. Example `home`
   * - Material icons: https://fonts.google.com/icons
   *
   * ### Requirements
   * ```html
   * Add this to your html:
   * <html>
   *   <head>
   *     <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
   *   </head>
   * <html>
   * ```
   */
  @Input() icon?: string;
  @Input() tooltip?: string;
}
