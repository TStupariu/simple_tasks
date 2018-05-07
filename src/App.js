import React, { Component } from 'react';
import './App.css';

import Home from './components/Home'
import Settings from './components/Settings'
import LogIn from './components/LogIn'

import { Switch, Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute path='/settings' component={Settings} />
        <Route path='/login' component={LogIn} />
      </Switch>
    );
  }
}

export default App;
