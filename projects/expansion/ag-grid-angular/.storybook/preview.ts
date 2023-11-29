import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  args: { agTheme: 'ag-theme-balham' },
  argTypes: {
    agTheme: {
      control: { type: 'radio' },
      options: [
        'ag-theme-alpine',
        'ag-theme-balham',
        'ag-theme-material',
        'ag-theme-quartz',
      ],
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
