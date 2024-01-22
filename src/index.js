import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterContainer from './RouterContainer';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterContainer />
  </React.StrictMode>
);
