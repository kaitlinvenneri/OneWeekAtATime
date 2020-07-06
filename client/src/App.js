import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PlannerPage from "./pages/PlannerPage";
import ToDoPage from "./pages/ToDoPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/todo-list" component={ToDoPage} />
          <Route path="/" component={PlannerPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
