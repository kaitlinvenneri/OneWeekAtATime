import React, { Component } from "react";
import axios from "axios";
import AddTaskForm from "./components/AddTaskForm";
import Tasks from "./components/Tasks";
import ScheduledTasks from "./components/ScheduledTasks";

class App extends Component {
  state = {
    tasks: [],
    scheduledTasks: [],
  };

  async componentDidMount() {
    await axios.get("http://localhost:4000/tasks").then((response) => {
      this.setState(
        (state) => ({
          tasks: response.data,
        }),
        async () => {
          const { data: scheduledTasks } = await axios.get(
            "http://localhost:4000/scheduled-tasks"
          );
          this.setState({ scheduledTasks });
        }
      );
    });
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

  handleTaskScheduling = async (taskId, taskDate) => {
    //TODO: Change this to be an optimistic update (it's pessimistic currently)
    let options = {
      params: {
        id: taskId,
        date: taskDate,
      },
    };

    await axios
      .get("http://localhost:4000/task/schedule", options)
      .then(async () => {
        const { data: tasks } = await axios.get("http://localhost:4000/tasks");
        this.setState({ tasks });
      })
      .then(async () => {
        const { data: scheduledTasks } = await axios.get(
          "http://localhost:4000/scheduled-tasks"
        );
        this.setState({ scheduledTasks });
      });
  };

  handleTaskAdding = async (taskTitle) => {
    //TODO: Change this to be an optimistic update (it's pessimistic currently)
    let options = {
      params: {
        title: taskTitle,
      },
    };

    await axios
      .get("http://localhost:4000/task/add", options)
      .then(async () => {
        const { data: tasks } = await axios.get("http://localhost:4000/tasks");
        this.setState({ tasks });
      });
  };

  render() {
    return (
      <div className="App">
        <AddTaskForm onAdd={this.handleTaskAdding} />
        <Tasks
          tasks={this.state.tasks}
          onSchedule={this.handleTaskScheduling}
          onDelete={this.handleTaskDelete}
        />
        <ScheduledTasks scheduledTasks={this.state.scheduledTasks} />
      </div>
    );
  }
}

export default App;
