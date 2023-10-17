import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  AgGridOptions,
  AgGridExtensionComponent,
  AgGridExpansionModule,
  actionsSets,
} from '../public-api';
import { AgGridModule } from 'ag-grid-angular';

const meta: Meta<AgGridExtensionComponent> = {
  component: AgGridExtensionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AgGridModule, AgGridExpansionModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AgGridExtensionComponent>;

const actions = actionsSets.standard;
const gridOptions: AgGridOptions = {
  columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
  enableRangeSelection: true,
  rowData: [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ],
  rowSelection: 'single',
};

export const SeachAndActions: Story = {
  args: {
    enableSearch: true,
    debounceSearch: 500,
    placeholderSearch: 'Search..',
  },
  render: (args) => ({
    props: {
      ...args,
      actions,
      gridOptions,
    },
    template: `
    <ag-grid-expansion
      [actions]="actions"
      [enableSearch]="enableSearch"
      [debounceSearch]="debounceSearch"
      [placeholderSearch]="placeholderSearch">
      <ag-grid-angular
        class="ag-theme-balham"
        style="width: 100%; height: 320px;"
        [gridOptions]="gridOptions">
      </ag-grid-angular>
    </ag-grid-expansion>
    `,
  }),
};

export const ContentProjections: Story = {
  args: {
    enableSearch: true,
    debounceSearch: 500,
    placeholderSearch: 'Search..',
  },
  render: (args) => ({
    props: {
      ...args,
      actions,
      gridOptions,
    },
    template: `
    <ag-grid-expansion
      [actions]="actions"
      [enableSearch]="enableSearch"
      [debounceSearch]="debounceSearch"
      [placeholderSearch]="placeholderSearch">
      <div toolbarLeft>toolbarLeft</div>
      <div toolbarCenter>toolbarCenter</div>
      <div toolbarRight>toolbarRight</div>
      <ag-grid-toolbar-action actionsLeft tooltip="I'm here because of *actionsLeft* content projection">arrow_left</ag-grid-toolbar-action>
      <ag-grid-toolbar-action actionsRight tooltip="I'm here because of *actionsRight* content projection">arrow_right</ag-grid-toolbar-action>
      <ag-grid-angular
        class="ag-theme-balham"
        style="width: 100%; height: 320px;"
        [gridOptions]="gridOptions">
      </ag-grid-angular>
    </ag-grid-expansion>
    `,
  }),
};
