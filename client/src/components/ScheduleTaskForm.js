import React, { Component } from 'react';

class ScheduleTaskForm extends Component {
  state = {
    date: new Date().toISOString().substr(0, 10),
  };
  render() {
    const { task, onSchedule, onCancelScheduling } = this.props;

    return (
      <div className="d-flex">
        <input
          key={task.taskId}
          type="date"
          value={this.state.date}
          onChange={(e) => this.setState({ date: e.target.value })}
        />
        <button
          onClick={() => onSchedule(task.taskId, this.state.date)}
          value={this.state.date}
          type="submit"
          className="btn btn-outline-info btn-sm ml-2"
        >
          Schedule
        </button>
        <button
          onClick={onCancelScheduling}
          type="submit"
          className="btn btn-outline-danger btn-sm ml-2"
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default ScheduleTaskForm;
