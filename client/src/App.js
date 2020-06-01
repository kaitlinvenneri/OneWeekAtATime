import React, { Component } from "react";
import axios from "axios";
import Tasks from "./components/Tasks";

class App extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
    const { data: tasks } = await axios.get("http://localhost:4000/tasks");
    this.setState({ tasks });
    //this.getTasks();
  }

  handleTaskDelete = (taskId) => {
    //TODO: Figure out how to actually delete task from db at this point (componentDidUpdate?)
    const tasks = this.state.tasks.filter((task) => task.Taskid !== taskId);
    this.setState({ tasks });
  };

  handleTaskScheduling = (taskId) => {
    //TODO: Make this happen
  };

  render() {
    return (
      <div className="App">
        <Tasks
          tasks={this.state.tasks}
          onSchedule={this.handleTaskScheduling}
          onDelete={this.handleTaskDelete}
        />
      </div>
    );
  }
}

export default App;
