import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

// OP Components
import {OpNav} from '@openpharma/op-js-lib-react';

// Local imports
import history from './components/Shared/history';
import defaultStore from './components/Shared/Redux/defaultStore';
import theme from './styles/theme';
import httpService from './api_client/interceptors';
import logo from './assets/img/logo_text.svg'

// Lazy component imports
const OccurrenceScan = lazy(() => import('./views/occurrenceScan'));

function LazyComponent(Component) {
  return props => (
    <Suspense fallback={<LinearProgress />}>
      <Component {...props} />
    </Suspense>
  );
}

httpService.setupInterceptors(defaultStore, history);
render(
  <Provider store={defaultStore}>
    <Router history={history}>
      <MuiThemeProvider theme={theme} styles={{ display: 'flex' }}>
        <CssBaseline />
        <OpNav logo={logo} navTitle="" position="sticky"/>
        <div>
          <Switch>
            <Route exact path="/" component={LazyComponent(OccurrenceScan)} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();
