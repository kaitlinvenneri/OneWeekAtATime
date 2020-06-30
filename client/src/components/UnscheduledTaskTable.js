import React, { Component } from "react";
import ScheduleTaskForm from "./ScheduleTaskForm";

class UnscheduledTaskTable extends Component {
  render() {
    const { tasks, onSchedule, onDelete } = this.props;

    return (
      <table
        className="table table-bordered table-warning mx-auto mb-4"
        style={{ width: "98%" }}
      >
        <thead>
          <tr>
            <th>Unscheduled Tasks</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskId}>
              <td>{task.title}</td>
              <td>
                <ScheduleTaskForm task={task} onSchedule={onSchedule} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(task.taskId)}
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

export default UnscheduledTaskTable;
