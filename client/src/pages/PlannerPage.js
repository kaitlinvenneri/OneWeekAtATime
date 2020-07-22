import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import WeekView from './../components/WeekView';

class PlannerPage extends Component {
  state = {
    weekScheduled: [],
  };

  async componentDidMount() {
    this.getCurrentWeek();
  }

  getCurrentWeek = async () => {
    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/current-week'
    );

    this.setState({ weekScheduled });
  };

  getWeekFromDate = async () => {
    let options = {
      params: {
        date: this.state.weekScheduled[0].date,
      },
    };

    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/get-week-from-date',
      options
    );
    this.setState({ weekScheduled });
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
      .then(() => {
        this.getWeekFromDate();
      });
  };

  handleSwitchingToPreviousWeek = async () => {
    let options = {
      params: {
        date: this.state.weekScheduled[0].date,
      },
    };

    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/previous-week',
      options
    );
    this.setState({ weekScheduled });
  };

  handleSwitchingToNextWeek = async () => {
    let options = {
      params: {
        date: this.state.weekScheduled[0].date,
      },
    };

    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/next-week',
      options
    );
    this.setState({ weekScheduled });
  };

  render() {
    return (
      <div>
        <NavBar active="Planner" />
        <WeekView
          weekScheduled={this.state.weekScheduled}
          onDelete={this.handleTaskUnscheduling}
          onPreviousWeekClick={this.handleSwitchingToPreviousWeek}
          onNextWeekClick={this.handleSwitchingToNextWeek}
          onGoToTodayClick={this.getCurrentWeek}
        />
      </div>
    );
  }
}

export default PlannerPage;
