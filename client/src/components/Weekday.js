import React, { Component } from 'react';
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

    //console.log(categories);

    return (
      <div className="card mx-auto shadow border-0" style={{ width: '14%' }}>
        <h5
          className="card-header text-center py-1 border-0"
          style={{ backgroundColor: '#0c66a6' }}
        >
          <div className="d-flex flex-row align-items-center justify-content-center">
            <b style={{ fontSize: '30px' }} className="mr-2">
              {day.dayOfMonth}
            </b>
            <span style={{ color: 'white' }}>{day.weekday}</span>
          </div>
        </h5>
        <div className="card-body pl-0 pr-0 pb-0 pt-0">
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
      </div>
    );
  }
}

export default Weekday;
