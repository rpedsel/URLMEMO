import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './containers/Posts';
import Shortener from './containers/Shortener';
import Message from './containers/Message';
import Layout from './hoc/Layout';
import Aux from './hoc/Aux';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
            <Switch>
              <Route path="/posts" component={Posts} />
              <Route path="/" exact component={Shortener} />
              <Route path="/:id" component={Message} />
            </Switch>
        </Layout>
      </Aux>
    );
  }
}

export default App;