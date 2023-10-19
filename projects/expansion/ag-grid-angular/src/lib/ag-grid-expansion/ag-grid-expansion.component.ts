import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AgGridToolbarAction,
  AgGridToolbarActionEvent,
} from './interfaces/ag-grid-toolbar-action';
import { AgGridContext } from './interfaces/ag-grid-context';
import { actionsSets } from './actions-sets';

/**
 * Expands ag-grid with a toolbar, search and actions.
 * ## Features:
 * - Quick search
 * - Toolbar actions
 *
 * ## Usage
 *
 * **Class:** `AgGridExtensionComponent`
 *
 * **Constants:**
 * - `actionsSets: AgGridToolbarAction[]` => Predefined sets of actions
 * - `presetActions: AgGridToolbarAction` => Predefined single actions. Fit columns, reset columns, cvs export etc
 *
 * **Interfaces:**
 * - `AgGridOptions` => `GridOptions` with `gridOptions.context` typed as `AgGridContext`
 * - `AgGridContext` => Interface for ag-grid `context`
 * - `AgGridFilter` => Interface for grid filter
 * - `AgGridFilters` => Interface for object of `AgGridFilter`'s
 * - `AgGridToolbarAction` => Properties for a toolbar action
 * - `AgGridToolbarActionEvent` => Type for the toolbar action click callback function
 *
 * **Module:** `import { AgGridExpansionModule } from '@expansion/ag-grid-angular';`
 *
 * **Selector:** `ag-grid-expansion`
 *
 * **Content projection:**
 * - Multi-slot
 *   - `toolbarLeft` => Toolbar left
 *   - `toolbarCenter` => Toolbar center
 *   - `toolbarRight` => Toolbar right
 *   - `actionsLeft` => pre actions
 *   - `actionsRight` => post actions
 * - Single-slot
 *
 * ### Typescript
 * ```ts
 * export class ExampleGridComponent {
 *   actions: AgGridToolbarAction[];
 *   gridOptions: AgGridOptions;
 * }
 * ```
 *
 * ### HTML
 * ```html
 * <ag-grid-expansion [actions]="actions">
 *   <ag-grid-angular
 *     class="ag-theme-balham"
 *     [gridOptions]="gridOptions">
 *   </ag-grid-angular>
 * </ag-grid-expansion>
 * ```
 *
 * ## Technical requirements
 *
 * Either `context` or `gridOptions.context` must exist on the `ag-grid-angular` element.
 *
 * ### Global search
 *
 * #### Client side
 *
 * Works out of the box for client side grids.
 *
 * #### Server side
 *
 * We need to use `quickFilterText` in our datasource implementation `IServerSideDatasource` like below.
 *
 * ```ts
 *   export class ExampleDatasource implements IServerSideDatasource {
 *       getRows(params: IServerSideGetRowsParams): void {
 *         const { quickFilterText } = params.context as AgGridToolbarContext;
 *         // Then use `quickFilterText` in backend call etc..
 *       }
 *   }
 * ```
 */
@Component({
  selector: 'ag-grid-expansion',
  templateUrl: './ag-grid-expansion.component.html',
  styleUrls: ['./ag-grid-expansion.component.scss'],
  host: { class: 'ag-theme-expansion' },
})
export class AgGridExtensionComponent {
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

  context!: AgGridContext;

  @ContentChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private cdr: ChangeDetectorRef) {}

  get toolbarActionEvent(): AgGridToolbarActionEvent {
    return {
      api: this.agGrid.api,
      columnApi: this.agGrid.columnApi,
      context: this.context,
    };
  }

  ngAfterViewInit(): void {
    this.context = this.agGrid.context || this.agGrid.gridOptions?.context;
    // agGrid changes after initializing itself
    this.cdr.detectChanges();
  }
}
