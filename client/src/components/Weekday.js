import React, { Component } from 'react';
//import AddTaskToWeekday from '../svgs/AddTaskToWeekday';
import ScheduledList from './ScheduledList';

//Weekday component within WeekView on Planner Page
class Weekday extends Component {
  handleAddTaskToWeekday = () => {
    const { day, onAddToWeekday } = this.props;

    onAddToWeekday(day);
  };

  render() {
    const { day, onDelete } = this.props;

    let categories = [];
    let category = {};
    let currCategoryInfo = {};
    let currTaskArray = [];

    if (day.scheduledTasks.length > 0) {
      let firstTask = day.scheduledTasks[0];

      //Initialize category info
      currCategoryInfo = {
        categoryId: firstTask.categoryId,
        color: firstTask.color,
        name: firstTask.name,
      };
    }

    for (let i = 0; i < day.scheduledTasks.length; i++) {
      let task = day.scheduledTasks[i];

      if (task.categoryId === currCategoryInfo.categoryId) {
        let taskObj = {
          completionStatus: task.completionStatus,
          scheduledId: task.scheduledId,
          title: task.title,
        };
        currTaskArray.push(taskObj);
      } else {
        category = {
          categoryId: currCategoryInfo.categoryId,
          color: currCategoryInfo.color,
          name: currCategoryInfo.name,
          scheduledTasks: currTaskArray,
        };
        categories.push(category);

        currCategoryInfo = {
          categoryId: task.categoryId,
          color: task.color,
          name: task.name,
        };

        let taskObj = {
          completionStatus: task.completionStatus,
          scheduledId: task.scheduledId,
          title: task.title,
        };
        currTaskArray = [];
        currTaskArray.push(taskObj);
      }
    }

    category = {
      categoryId: currCategoryInfo.categoryId,
      color: currCategoryInfo.color,
      name: currCategoryInfo.name,
      scheduledTasks: currTaskArray,
    };
    categories.push(category);

    console.log(categories);

    return (
      <div
        className="card mx-auto"
        style={{ width: '14%', borderColor: '#083a5e' }}
      >
        <h5
          className="card-header text-center"
          style={{ backgroundColor: '#0c66a6', color: 'white' }}
        >
          {day.weekday}
          <br />
          {day.dateString}
        </h5>
        <div className="card-body pl-2 pr-2 pb-2 pt-0">
          {day.scheduledTasks.length === 0 ? (
            <div className="p-5"></div>
          ) : (
            categories.map((cat) => (
              <ScheduledList
                category={cat}
                onDelete={onDelete}
                key={cat.categoryId}
              />
            ))
          )}
        </div>
        {/* <AddTaskToWeekday onClick={this.handleAddTaskToWeekday} /> */}
      </div>
    );
  }
}

export default Weekday;
