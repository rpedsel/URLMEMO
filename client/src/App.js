import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './containers/Posts';
import Shortener from './containers/Shortener';
import Message from './containers/Message';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/posts" component={Posts} />
            <Route path="/" exact component={Shortener} />
            <Route path="/:id" component={Message} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;