import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AgGridModule } from 'ag-grid-angular';
import {
  AgGridExpansionModule,
  AgGridExtensionComponent,
  AgGridOptions,
  actionsSets,
} from '../public-api';

const meta: Meta<AgGridExtensionComponent> = {
  component: AgGridExtensionComponent,
  decorators: [
    moduleMetadata({
      imports: [AgGridModule, AgGridExpansionModule],
    }),
  ],
  render: (args) => ({
    props: {
      ...args,
      actions,
      gridOptions,
    },
    template: `
    <ag-grid-expansion
      [class]="agTheme"
      [actions]="actions"
      [disableSearch]="disableSearch"
      [debounceSearch]="debounceSearch"
      [enableSearch]="enableSearch"
      [placeholderSearch]="placeholderSearch">
      <ag-grid-angular
        style="width: 100%; height: 320px;"
        [gridOptions]="gridOptions">
      </ag-grid-angular>
    </ag-grid-expansion>
    `,
  }),
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AgGridExtensionComponent>;

const actions = [
  ...actionsSets.standard,
  {
    disabled: true,
    icon: 'home',
    tooltip: 'Home',
  },
];
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
    debounceSearch: 500,
    disableSearch: false,
    enableSearch: true,
    placeholderSearch: 'Search..',
  },
};

export const ContentProjections: Story = {
  args: {
    debounceSearch: 500,
    disableSearch: false,
    enableSearch: true,
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
      class="ag-theme-balham"
      [actions]="actions"
      [disableSearch]="disableSearch"
      [debounceSearch]="debounceSearch"
      [enableSearch]="enableSearch"
      [placeholderSearch]="placeholderSearch">
      <div toolbarLeft>toolbarLeft</div>
      <div toolbarCenter>toolbarCenter</div>
      <div toolbarRight>toolbarRight</div>
      <ag-grid-toolbar-action actionsLeft tooltip="I'm here because of *actionsLeft* content projection">arrow_left</ag-grid-toolbar-action>
      <ag-grid-toolbar-action actionsRight tooltip="I'm here because of *actionsRight* content projection">arrow_right</ag-grid-toolbar-action>
      <ag-grid-angular
        style="width: 100%; height: 320px;"
        [gridOptions]="gridOptions">
      </ag-grid-angular>
    </ag-grid-expansion>
    `,
  }),
};
