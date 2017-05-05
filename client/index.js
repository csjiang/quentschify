import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

// Import your routes so that you can pass them to the <Router /> component
import routes from './routes.js';
import { useBasename } from 'history';

render((
  <Router routes={routes} history={useBasename(() => browserHistory)({ basename: process.env.PUBLIC_URL })} />
), document.getElementById('root'));
