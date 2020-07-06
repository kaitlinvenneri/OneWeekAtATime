import React, { Component } from "react";
import axios from "axios";
import ToDoItem from "./ToDoItem";

class ToDoList extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
    await axios.get("http://localhost:4000/tasks").then((response) => {
      this.setState((state) => ({
        tasks: response.data,
      }));
    });
  }

  handleChangingTaskCompletionStatus = async (task) => {
    let options = {
      params: {
        id: task.taskId,
      },
    };

    if (task.completionStatus === 1) {
      await axios.get("http://localhost:4000/task/mark-incomplete", options);
    } else {
      await axios.get("http://localhost:4000/task/mark-complete", options);
    }

    await axios.get("http://localhost:4000/tasks").then((response) => {
      this.setState((state) => ({
        tasks: response.data,
      }));
    });
  };

  handleTaskDelete = async (taskId) => {
    let options = {
      params: {
        id: taskId,
      },
    };

    const tasks = this.state.tasks.filter((task) => task.taskId !== taskId);

    this.setState({ tasks });

    await axios.get("http://localhost:4000/task/delete", options);
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
        await axios.get("http://localhost:4000/task/mark-scheduled", options);
      })
      .then(async () => {
        const { data: tasks } = await axios.get("http://localhost:4000/tasks");
        this.setState({ tasks });
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

  handleTaskUnscheduling = async (scheduledId, taskId) => {
    let options = {
      params: {
        scheduledId: scheduledId,
        taskId: taskId,
      },
    };

    await axios
      .get("http://localhost:4000/scheduled-task/delete", options)
      .then(async (response) => {
        let unscheduleNeeded = false;

        let taskOptions = {
          params: {
            id: response.data.taskId,
          },
        };

        //Get all instances of scheduled tasks with this taskId
        const { data: scheduledTasks } = await axios.get(
          "http://localhost:4000/scheduled-tasks/get-by-task-id",
          taskOptions
        );

        //If there are no scheduled tasks with this task id, uncheduling is required
        if (scheduledTasks.length === 0) {
          unscheduleNeeded = true;
        }

        //Unschedule the task (mark scheduledStatus 0)
        if (unscheduleNeeded) {
          await axios.get(
            "http://localhost:4000/task/mark-unscheduled",
            taskOptions
          );
        }
      })
      .then(async () => {
        const { data: tasks } = await axios.get("http://localhost:4000/tasks");
        this.setState({ tasks });
      });
  };
  render() {
    return (
      <table className="table table-striped table-borderless w-auto mx-auto">
        <thead>
          <tr>
            <th scope="col" style={{ fontSize: "20px" }}>
              To Do
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-journal-plus"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path d="M4 1h5v1H4a1 1 0 0 0-1 1H2a2 2 0 0 1 2-2zm10 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1zM2 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2z" />
                <path
                  fillRule="evenodd"
                  d="M13.5 1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V1.5a.5.5 0 0 1 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M13 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
                />
              </svg>
            </td>
          </tr>
          {this.state.tasks.map((task) => (
            <tr key={task.taskId}>
              <td>
                <ToDoItem
                  task={task}
                  onDelete={this.handleTaskDelete}
                  onChangeCompletion={this.handleChangingTaskCompletionStatus}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ToDoList;
