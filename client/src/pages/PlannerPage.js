import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import WeekView from './../components/WeekView';
import ToDoList from '../components/ToDoList';

class PlannerPage extends Component {
  state = {
    weekScheduled: [],
    addingToWeekday: false,
    weekdayAddingTo: {},
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

  getWeekFromDate = async (date) => {
    let options = {
      params: {
        date: date,
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
        this.getWeekFromDate(this.state.weekScheduled[0].date);
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

  handleChooseToAddToWeekday = (day) => {
    this.setState(
      (state) => ({
        weekdayAddingTo: day,
      }),
      () => {
        this.setState({ addingToWeekday: true });
      }
    );
  };

  handleAddingToWeekday = () => {
    this.getWeekFromDate();

    this.setState({ addingToWeekday: false });
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
          onAddToWeekday={this.handleChooseToAddToWeekday}
          onGoToDate={this.getWeekFromDate}
        />
        {this.state.addingToWeekday && (
          <ToDoList
            fromPlanner={true}
            weekday={this.state.weekdayAddingTo}
            onAddToWeekday={this.handleAddingToWeekday}
          />
        )}
      </div>
    );
  }
}

export default PlannerPage;
