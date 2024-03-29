import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AgGridModule } from 'ag-grid-angular';
import {
  AgGridExpansionModule,
  AgGridExtensionComponent,
  AgGridToolbarAction,
  actionsSets,
} from '../../public-api';
import { gridOptions } from '../../stories/story-helpers/grid-options';

const actions: AgGridToolbarAction[] = [
  {
    clickFn: ({ api }) => {
      const data = { id: Number((Math.random() * 1000).toFixed(0)) };
      const transaction = api.applyTransaction({ add: [data] });
      api.flashCells({ rowNodes: transaction?.add });
    },
    color: 'seagreen',
    icon: 'add_circle',
    tooltip: 'Add new row',
  },
  {
    clickFn: () => {
      alert('Edit action clicked');
    },
    color: 'dodgerblue',
    disabled: true,
    icon: 'edit',
    tooltip: 'Edit',
  },
  {
    clickFn: ({ api }) => {
      const rows = api.getSelectedRows();
      api.applyTransaction({ remove: rows });
    },
    color: 'crimson',
    disabled: true,
    icon: 'delete',
    tooltip: 'Delete selected row(s)',
  },
  {},
  ...actionsSets.redoUndo,
  {},
  ...actionsSets.standard,
];

const meta: Meta<AgGridExtensionComponent> = {
  title: 'Ag Grid Extension',
  component: AgGridExtensionComponent,
  decorators: [
    moduleMetadata({
      imports: [AgGridModule, AgGridExpansionModule],
    }),
  ],
  render: (args) => {
    return {
      props: {
        ...args,
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
        style="width: 100%; height: 700px;"
        [gridOptions]="gridOptions">
      </ag-grid-angular>
    </ag-grid-expansion>
    `,
    };
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AgGridExtensionComponent>;

export const SeachAndActions: Story = {
  args: {
    actions: actions,
    debounceSearch: 500,
    disableSearch: false,
    enableSearch: true,
    placeholderSearch: 'Search..',
  },
};

export const ContentProjections: Story = {
  args: {
    actions: actions,
    debounceSearch: 500,
    disableSearch: false,
    enableSearch: true,
    placeholderSearch: 'Search..',
  },
  render: (args) => ({
    props: {
      ...args,
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
