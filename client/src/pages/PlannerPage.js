import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import WeekView from './../components/WeekView';
//import ToDoList from '../components/ToDoList';
import Lists from './../components/Lists';
import AddListButton from './../components/AddListButton';
import AddListModal from './../components/AddListModal';

//Planner Page Component
class PlannerPage extends Component {
  state = {
    categories: [],
    weekScheduled: [],
    weekdayAddingTo: {},
  };

  async componentDidMount() {
    //Get list categories
    this.getCategories();

    //Get current week and tasks associated
    this.getCurrentWeek();
  }

  getCategories = async () => {
    const { data: categories } = await axios.get(
      'http://localhost:4000/categories'
    );

    this.setState({ categories });
  };

  handleAddingList = async (categoryName, categoryColor) => {
    let options = {
      params: {
        name: categoryName,
        color: categoryColor,
      },
    };

    await axios.get('http://localhost:4000/category/add', options);

    await this.getCategories();
  };

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
        <div
          className="d-flex flex-row align-items-start mt-3"
          style={{ width: '100%' }}
        >
          <AddListButton />
          <Lists categories={this.state.categories} />
        </div>
        <AddListModal onAdd={this.handleAddingList} />
      </div>
    );
  }
}

export default PlannerPage;
