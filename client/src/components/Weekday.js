import React, { Component } from 'react';
import WeekViewTask from './WeekViewTask';
import AddTaskToWeekday from '../svgs/AddTaskToWeekday';

//Weekday component within WeekView on Planner Page
class Weekday extends Component {
  handleAddTaskToWeekday = () => {
    const { day, onAddToWeekday } = this.props;

    onAddToWeekday(day);
  };

  render() {
    const { day, onDelete } = this.props;
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
          {day.scheduledTasks.map((task) => (
            <WeekViewTask
              task={task}
              onDelete={onDelete}
              key={task.scheduledId}
            />
          ))}
        </div>
        {/* <AddTaskToWeekday onClick={this.handleAddTaskToWeekday} /> */}
      </div>
    );
  }
}

export default Weekday;
