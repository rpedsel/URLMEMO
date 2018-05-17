import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './containers/Posts';
import Shortener from './containers/Shortener';
import Message from './containers/Message';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({
        long_url: res.long_url,
        message: res.message
      }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('d');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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