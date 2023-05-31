import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalDataProvider } from './context/globalContext';

import 'antd/dist/reset.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalDataProvider>
      <App />
    </GlobalDataProvider>
  </React.StrictMode>
);
