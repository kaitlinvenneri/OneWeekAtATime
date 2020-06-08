import React, { Component } from "react";
import ScheduleTaskForm from "./ScheduleTaskForm";

//TODO: Refactor out the table to make the table a reusable component?
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
                <ScheduleTaskForm task={task} onSchedule={onSchedule} />
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
