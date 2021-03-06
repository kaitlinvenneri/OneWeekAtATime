import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import WeekView from './../components/WeekView';
//import ToDoList from '../components/ToDoList';
import Lists from './../components/Lists';
import AddListModal from './../components/AddListModal';
import ShowListsButton from '../components/ShowListsButton';

//Planner Page Component
class PlannerPage extends Component {
  state = {
    categories: [],
    weekScheduled: [],
    listSectionShowing: true,
  };

  async componentDidMount() {
    //Get list categories
    await this.getCategories();

    //Get current week and tasks associated
    await this.getCurrentWeek();
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

  handleDeletingList = async (categoryId) => {
    let options = {
      params: {
        categoryId: categoryId,
      },
    };

    await axios.get('http://localhost:4000/category/delete', options);

    await this.getCategories();

    await this.getCurrentWeek();
  };

  //Get week based on current date, and associated tasks
  getCurrentWeek = async () => {
    const { data: weekScheduled } = await axios.get(
      'http://localhost:4000/current-week'
    );

    //console.log(weekScheduled);

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

  handleListSectionShowHide = () => {
    let sectionShowing = !this.state.listSectionShowing;

    this.setState({ listSectionShowing: sectionShowing });
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
          onGoToDate={this.getWeekFromDate}
        />

        <div className="d-flex flex-row align-items-center justify-content-center mx-2 mt-4">
          <ShowListsButton
            listsShowing={this.state.listSectionShowing}
            onClick={this.handleListSectionShowHide}
          />
        </div>

        {this.state.listSectionShowing && (
          <Lists
            categories={this.state.categories}
            onDeleteList={this.handleDeletingList}
            updateWeekview={this.getCurrentWeek}
          />
        )}

        <AddListModal onAdd={this.handleAddingList} />
      </div>
    );
  }
}

export default PlannerPage;
