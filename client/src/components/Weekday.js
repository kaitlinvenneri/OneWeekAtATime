import React, { Component } from 'react';
import WeekViewTask from './WeekViewTask';

//Weekday component within WeekView on Planner Page
class Weekday extends Component {
  handleAddTaskToWeekday = () => {
    const { day, onAddToWeekday } = this.props;

    onAddToWeekday(day);
  };

  render() {
    const { day, onDelete } = this.props;

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
            day.scheduledTasks.map((task) => (
              <WeekViewTask
                task={task}
                onDelete={onDelete}
                key={task.scheduledId}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Weekday;
