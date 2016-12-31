import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import About from './components/About/About'
import BlackRose from './components/BlackRose/BlackRose'
import NotFound from './components/NotFound/NotFound'
import Contact from './components/Contact/Contact'
import CharacterSelection from './components/CharacterSelection/CharacterSelection'

var css = require('./Main.styl');

export default class App extends Component {
  render() {
    return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="contact" component={Contact} />
        <Route path="blackrose" component={BlackRose} />
        <Route path="characterselection" component={CharacterSelection} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
    );
  }
}
