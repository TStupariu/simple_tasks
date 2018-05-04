import React, { Component } from 'react';
import './App.css';

import Home from './components/Home'
import Settings from './components/Settings'
import LogIn from './components/LogIn'

import { Switch, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/login' component={LogIn}/>
      </Switch>
      );
  }
}

export default App;
