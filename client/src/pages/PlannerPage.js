import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import WeekView from './../components/WeekView';
import ToDoList from '../components/ToDoList';

//Planner Page Component
class PlannerPage extends Component {
  state = {
    weekScheduled: [],
    addingToWeekday: false,
    weekdayAddingTo: {},
  };

  async componentDidMount() {
    //Get current week and tasks associated
    this.getCurrentWeek();
  }

  //Get week based on current date, and associated tasks
  getCurrentWeek = async () => {
    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/current-week'
    );

    this.setState({ weekScheduled });
  };

  //Get week based on date sent in, and associated tasks
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

  //Unschedule a task
  handleTaskUnscheduling = async (scheduledId) => {
    let options = {
      params: {
        scheduledId: scheduledId,
      },
    };

    await axios
      .get('http://localhost:4000/scheduled-task/delete', options)
      .then(() => {
        this.getWeekFromDate(this.state.weekScheduled[0].date);
      });
  };

  //Switch to previous week
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

  //Switch to next week
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

  //Add task to chosen day of the week
  handleAddingToWeekday = () => {
    this.getWeekFromDate(this.state.weekScheduled[0].date);

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
