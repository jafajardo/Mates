import React from 'react';
import { Router, browserHistory } from 'react-router';

import App from './components/app';
import Home from './components/home';

const loadModule = (cb) => {
  return module => cb(null, module.default);
}

const componentRoutes = {
  component: App,
  path: '/',
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'signin',
      getComponent(location, cb) {
        System.import('./components/auth/signin')
          .then(loadModule(cb));
      }
    },
    {
      path: 'signup',
      getComponent(location, cb) {
        System.import('./components/auth/signup')
          .then(loadModule(cb));
      }
    },
    {
      path: 'addFriend',
      getComponent(location, cb) {
        System.import('./components/addFriend')
          .then(loadModule(cb));
      }
    },
    {
      path: 'friendRequest',
      getComponent(location, cb) {
        System.import('./components/friendRequest')
          .then(loadModule(cb));
      }
    }
  ]
}

const Routes = () => {
  return (
    <Router history={browserHistory} routes={componentRoutes} />
  );
}

export default Routes;