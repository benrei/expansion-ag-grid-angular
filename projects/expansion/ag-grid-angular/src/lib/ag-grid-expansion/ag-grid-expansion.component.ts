import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridToolbarAction } from './interfaces/ag-grid-toolbar-action';
import { actionsSets } from './actions-sets';
import { AgGridEvent } from 'ag-grid-community';

/**
 * Expands ag-grid with a toolbar, search and actions.
 *
 * ### Prerequisites
 *
 * - [Ag Grid Angular](https://www.ag-grid.com/angular-data-grid/getting-started/)
 * - [Material Icons font](https://fonts.google.com/icons?icon.set=Material+Icons&icon.style=Outlined)
 *   - [Setup font](https://developers.google.com/fonts/docs/material_icons#icon_font_for_the_web): add in `index.html` or similar
 *
 * ```html
 * <html>
 *   <head>
 *     <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
 * ```
 *
 * ## Features:
 * - Quick search
 * - Toolbar actions
 * - Content projections
 *   - Multi-slot
 *     - `toolbarLeft` => Toolbar left
 *     - `toolbarCenter` => Toolbar center
 *     - `toolbarRight` => Toolbar right
 *     - `actionsLeft` => pre actions
 *     - `actionsRight` => post actions
 *   - Single-slot
 * - Adapts to ag-grid themes
 *
 * ## Component overview
 *
 * **Class:** `AgGridExtensionComponent`
 *
 * **Constants:**
 * - `actionsSets: AgGridToolbarAction[]` => Predefined sets of actions
 * - `presetActions: AgGridToolbarAction` => Predefined single actions. Fit columns, reset columns, cvs export etc
 *
 * **Interfaces:**
 * - `AgGridContext` => Properties this component adds to `gridOptions.context`
 * - `AgGridToolbarAction` => Properties for a toolbar action
 *
 * **Module:** `import { AgGridExpansionModule } from '@expansion/ag-grid-angular';`
 *
 * **Selector:** `ag-grid-expansion`
 *
 * ### Global search
 *
 * #### Client side
 *
 * Works out of the box for client side grids.
 *
 * #### Other row models
 *
 * Use `context.quickFilterText` in custom datasource implementation `IServerSideDatasource` like below.
 *
 * ```ts
 *   // server-side example
 *   export class ExampleDatasource implements IServerSideDatasource {
 *       getRows(params: IServerSideGetRowsParams): void {
 *         const { quickFilterText } = params.context as AgGridToolbarContext;
 *         // Then use `quickFilterText` in backend call etc..
 *       }
 *   }
 * ```
 *
 * ### Code example
 *
 * ```ts
 * @Component({
 *   standalone: true,
 *   selector: 'app-demo-grid',
 *   imports: [AgGridExpansionModule],
 *   template: `
 *     <ag-grid-expansion class="ag-theme-balham" [actions]="actions">
 *       <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>
 *     </ag-grid-expansion>
 *   `,
 * })
 * export class DemoGridComponent {
 *   actions: AgGridToolbarAction[];
 *   gridOptions: GridOptions;
 * }
 * ```
 */
@Component({
  selector: 'ag-grid-expansion',
  templateUrl: './ag-grid-expansion.component.html',
  styleUrls: ['./ag-grid-expansion.component.scss'],
  host: { class: 'ag-theme-expansion' },
})
export class AgGridExtensionComponent implements AfterViewInit {
  /** Toolbar actions */
  @Input() actions: AgGridToolbarAction[] = actionsSets.standard;
  /** Debounce in ms for seach input */
  @Input() debounceSearch = 500;
  /** Disable search field*/
  @Input() disableSearch = false;
  /** Enable search field*/
  @Input() enableSearch = true;
  /** Seach placeholdet text */
  @Input() placeholderSearch = 'Search...';

  @ContentChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private cdr: ChangeDetectorRef) {}

  get context(): any {
    return this.agGrid.context || this.agGrid.gridOptions?.context;
  }

  get toolbarActionEvent(): AgGridEvent {
    const context = this.agGrid.context || this.agGrid.gridOptions?.context;
    return { api: this.agGrid.api, context } as AgGridEvent;
  }

  ngAfterViewInit(): void {
    if (!this.context) {
      const context = { actions: this.actions };
      this.agGrid.api.setGridOption('context', context);
    } else {
      this.context.actions = this.actions;
    }
    // agGrid changes after initializing itself
    this.cdr.detectChanges();
  }
}
