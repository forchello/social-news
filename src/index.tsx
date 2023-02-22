import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'helpers/i18next';

import { Provider } from 'react-redux';
import { setupStore } from 'store/store';
import NavigationWrapper from './wrappers/Navigation';
import { ThemeProvider } from '@mui/material';
import { theme } from 'helpers/theme';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
            <NavigationWrapper />
          </ThemeProvider>
      </Provider>
  </React.StrictMode>
);
