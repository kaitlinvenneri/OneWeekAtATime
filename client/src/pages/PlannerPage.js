import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import WeekView from './../components/WeekView';

class PlannerPage extends Component {
  state = {
    tasks: [],
    weekScheduled: [],
  };

  async componentDidMount() {
    await axios.get('http://localhost:4000/tasks').then((response) => {
      this.setState((state) => ({
        tasks: response.data,
      }));
    });

    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/current-week'
    );

    this.setState({ weekScheduled });
  }

  handleTaskDelete = async (taskId) => {
    let options = {
      params: {
        id: taskId,
      },
    };

    const tasks = this.state.tasks.filter((task) => task.taskId !== taskId);
    this.setState({ tasks });

    await axios.get('http://localhost:4000/task/delete', options);
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
      .get('http://localhost:4000/task/schedule', options)
      .then(async () => {
        await axios.get('http://localhost:4000/task/mark-scheduled', options);
      })
      .then(async () => {
        const { data: tasks } = await axios.get('http://localhost:4000/tasks');
        this.setState({ tasks });
      })
      .then(async () => {
        const { data: weekScheduled } = await axios.get(
          'http://localhost:4000/current-week'
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
      .get('http://localhost:4000/task/add', options)
      .then(async () => {
        const { data: tasks } = await axios.get('http://localhost:4000/tasks');
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
      .get('http://localhost:4000/scheduled-task/delete', options)
      .then(async (response) => {
        let unscheduleNeeded = false;

        let taskOptions = {
          params: {
            id: response.data.taskId,
          },
        };

        //Get all instances of scheduled tasks with this taskId
        const { data: scheduledTasks } = await axios.get(
          'http://localhost:4000/scheduled-tasks/get-by-task-id',
          taskOptions
        );

        //If there are no scheduled tasks with this task id, uncheduling is required
        if (scheduledTasks.length === 0) {
          unscheduleNeeded = true;
        }

        //Unschedule the task (mark scheduledStatus 0)
        if (unscheduleNeeded) {
          await axios.get(
            'http://localhost:4000/task/mark-unscheduled',
            taskOptions
          );
        }
      })
      .then(async () => {
        const { data: tasks } = await axios.get('http://localhost:4000/tasks');
        this.setState({ tasks });
      })
      .then(async () => {
        const { data: weekScheduled } = await axios.get(
          'http://localhost:4000/current-week'
        );
        this.setState({ weekScheduled });
      });
  };

  render() {
    return (
      <div>
        <NavBar active="Planner" />
        <WeekView
          weekScheduled={this.state.weekScheduled}
          onDelete={this.handleTaskUnscheduling}
        />
      </div>
    );
  }
}

export default PlannerPage;
