import React, { Component } from "react";

//TODO: Refactor out the table to make the table a reusable component
class Tasks extends Component {
  render() {
    const { tasks, onSchedule, onDelete } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Unscheduled Tasks</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.Taskid}>
              <td>{task.Title}</td>
              <td>
                <button onClick={onSchedule} className="btn btn-info btn-sm">
                  Schedule
                </button>
              </td>
              <td>
                <button
                  onClick={() => onDelete(task.Taskid)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Tasks;
