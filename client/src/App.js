import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PlannerPage from './pages/PlannerPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={PlannerPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
