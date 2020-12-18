import React, { Component } from 'react';
import WeekViewTask from './WeekViewTask';

class ScheduledList extends Component {
  state = {};

  render() {
    const { category, onDelete } = this.props;

    let backgroundColor = 'white';
    let borderColor = 'black';

    // TODO: Make this into a map that comes from another file
    if (category.color === 'gray') {
      backgroundColor = '#e1e6ea';
      borderColor = '#4b5968';
    } else if (category.color === 'blue') {
      backgroundColor = '#e3f2fd';
      borderColor = '#0c66a6';
    } else if (category.color === 'pink') {
      backgroundColor = '#ffcce6';
      borderColor = '#cc0069';
    } else if (category.color === 'green') {
      backgroundColor = '#b3e6b3';
      borderColor = '#194d33';
    } else if (category.color === 'orange') {
      backgroundColor = '#ffe0b3';
      borderColor = '#e65c00';
    }

    return (
      <div
        className="card mx-2 my-2"
        style={{
          backgroundColor: `${backgroundColor}`,
          border: `2px solid ${borderColor}`,
        }}
      >
        <div
          className="card-header d-flex justify-content-between align-items-center px-2 py-2"
          style={{
            borderBottom: `2px solid ${borderColor}`,
            backgroundColor: `${backgroundColor}`,
            color: `${borderColor}`,
          }}
        >
          <h6 className="my-0">{this.props.category.name}</h6>
        </div>
        <div
          className="card-body pt-2 pb-0 px-2"
          //style={{ backgroundColor: `${backgroundColor}` }}
        >
          {this.props.category.scheduledTasks.map((task) => (
            <WeekViewTask
              task={task}
              onDelete={onDelete}
              key={task.scheduledId}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ScheduledList;
