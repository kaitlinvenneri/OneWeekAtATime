import React, { Component } from "react";

class ScheduleTaskForm extends Component {
  state = {
    date: "",
  };
  render() {
    const { task, onSchedule } = this.props;
    return (
      <div className="d-flex">
        <input
          key={task.taskId}
          type="date"
          onChange={(e) => this.setState({ date: e.target.value })}
        />
        <button
          onClick={() => onSchedule(task.taskId, this.state.date)}
          value={this.state.date}
          type="submit"
          className="btn btn-info btn-sm ml-2"
        >
          Schedule
        </button>
      </div>
    );
  }
}

export default ScheduleTaskForm;
