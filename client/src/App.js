import React, { Component } from "react";
import axios from "axios";
import Tasks from "./components/Tasks";
import addTaskForm from "./components/AddTaskForm";
import AddTaskForm from "./components/AddTaskForm";

class App extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
    const { data: tasks } = await axios.get("http://localhost:4000/tasks");
    this.setState({ tasks });
    //this.getTasks();
  }

  handleTaskDelete = async (taskId) => {
    //TODO: Change this to be an optimistic update (it's pessimistic currently)
    let options = {
      params: {
        id: taskId,
      },
    };

    await axios.get("http://localhost:4000/task/delete", options);

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
        <AddTaskForm />
      </div>
    );
  }
}

export default App;
