import React, { Component } from "react";

//TODO: Refactor out the table to make the table a reusable component
class ScheduledTasks extends Component {
  render() {
    const { scheduledTasks } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Scheduled Tasks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scheduledTasks.map((scheduledTask) => (
            <tr key={scheduledTask.Scheduledid}>
              <td>{scheduledTask.Title}</td>
              <td>{scheduledTask.ScheduledDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScheduledTasks;
