import React, { Component } from 'react';

class ScheduleTaskForm extends Component {
  state = {
    date: '',
  };

  componentDidMount() {
    let currDay = new Date();
    currDay.setUTCDate(currDay.getDate());
    let ISOstring = currDay.toISOString();
    ISOstring = ISOstring.substr(0, 10);

    this.setState({ date: ISOstring });
  }

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
          className="btn btn-info btn-sm ml-2"
        >
          Schedule
        </button>
        <button
          onClick={onCancelScheduling}
          type="submit"
          className="btn btn-danger btn-sm ml-2"
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default ScheduleTaskForm;
