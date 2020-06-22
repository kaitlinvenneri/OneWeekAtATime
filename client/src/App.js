import React, { Component } from "react";
import axios from "axios";
import AddTaskForm from "./components/AddTaskForm";
import UnscheduledTaskTable from "./components/UnscheduledTaskTable";
import ScheduledTaskTable from "./components/ScheduledTaskTable";
import WeekView from "./components/WeekView";

class App extends Component {
  state = {
    tasks: [],
    unscheduledTasks: [],
    scheduledTasks: [],
    weekScheduled: [],
  };

  async componentDidMount() {
    await axios.get("http://localhost:4000/tasks").then((response) => {
      this.setState(
        (state) => ({
          tasks: response.data,
        }),
        async () => {
          await axios
            .get("http://localhost:4000/scheduled-tasks")
            .then((response) => {
              this.setState(
                (state) => ({
                  scheduledTasks: response.data,
                }),
                async () => {
                  const unscheduledTasks = this.state.tasks.filter(
                    (task) => task.scheduledStatus === 0
                  );
                  this.setState({ unscheduledTasks });

                  const { data: weekScheduled } = await axios.get(
                    "http://localhost:4000/week"
                  );
                  this.setState({ weekScheduled });
                }
              );
            });
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

    const unscheduledTasks = this.state.unscheduledTasks.filter(
      (task) => task.taskId !== taskId
    );
    this.setState({ unscheduledTasks });

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
      })
      .then(async () => {
        const { data: scheduledTasks } = await axios.get(
          "http://localhost:4000/scheduled-tasks"
        );
        this.setState({ scheduledTasks });
      })
      .then(async () => {
        const unscheduledTasks = this.state.tasks.filter(
          (task) => task.scheduledStatus === 0
        );
        this.setState({ unscheduledTasks });
      })
      .then(async () => {
        const { data: weekScheduled } = await axios.get(
          "http://localhost:4000/week"
        );
        this.setState({ weekScheduled });
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
      })
      .then(async () => {
        const { data: scheduledTasks } = await axios.get(
          "http://localhost:4000/scheduled-tasks"
        );
        this.setState({ scheduledTasks });
      })
      .then(async () => {
        const unscheduledTasks = this.state.tasks.filter(
          (task) => task.scheduledStatus === 0
        );
        this.setState({ unscheduledTasks });
      })
      .then(async () => {
        const { data: weekScheduled } = await axios.get(
          "http://localhost:4000/week"
        );
        this.setState({ weekScheduled });
      });
  };

  render() {
    return (
      <div className="App">
        <AddTaskForm onAdd={this.handleTaskAdding} />
        <UnscheduledTaskTable
          tasks={this.state.unscheduledTasks}
          onSchedule={this.handleTaskScheduling}
          onDelete={this.handleTaskDelete}
        />
        <ScheduledTaskTable scheduledTasks={this.state.scheduledTasks} />
        <WeekView
          weekScheduled={this.state.weekScheduled}
          onDelete={this.handleTaskUnscheduling}
        />
      </div>
    );
  }
}

export default App;
