import React from 'react';
import type { Preview, StoryFn } from '@storybook/react';
import { MobileProvider } from '../app/utils/MobileContext/MobileContext';
import '@/app/styles/normalize.css';
import '@/app/styles/globals.css';
import './fontfix.css';

export const decorators: Array<(Story: StoryFn) => JSX.Element> = [
  (Story) => (
    <MobileProvider initialIsMobile={false}>
      <Story />
    </MobileProvider>
  ),
];

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
