import type { Preview } from '@storybook/react';
import '@/app/styles/normalize.css';
import '@/app/styles/globals.css';
import './fontfix.css';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        desctop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
        mobile: {
          name: 'Mobile',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#181818',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
