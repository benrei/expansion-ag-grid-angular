import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CreateRowDirective } from '../../public-api';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptionsService } from '../story-helpers/grid-options.service';
import { ServerSideDatasourceService } from '../story-helpers/server-side-datasource.service';

const gridOptionsService = new GridOptionsService(
  new ServerSideDatasourceService()
);

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<CreateRowDirective> = {
  title: 'Directives/Create Row',
  component: CreateRowDirective,
  decorators: [
    moduleMetadata({
      imports: [AgGridModule],
    }),
  ],
  tags: ['autodocs'],
  render: (args: CreateRowDirective) => ({
    props: {
      ...args,
      gridOptions: gridOptionsService.clientSide(),
    },
    template: `
      <ag-grid-angular
        class="ag-theme-balham"
        style="width: 100%; height: 320px;"
        agCreateRow
        [enableFlashInsertedRows]="enableFlashInsertedRows"
        [idField]="idField || 'id'"
        [gridOptions]="gridOptions">
    </ag-grid-angular>
    `,
  }),
};

export default meta;
type Story = StoryObj<CreateRowDirective>;

export const ClientSide: Story = {
  args: {},
};
export const FlashAddedRows: Story = {
  args: {
    enableFlashInsertedRows: true,
  },
};
