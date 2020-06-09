import React, { Component } from "react";

//TODO: Refactor out the table to make the table a reusable component
class ScheduledTasks extends Component {
  render() {
    const { tasks, scheduledTasks } = this.props;

    //TODO: Move the map setting to ComponentDidMount?
    let taskMap = new Map();
    let scheduledTaskMap = new Map();

    let i;
    for (i = 0; i < tasks.length; i++) {
      taskMap.set(tasks[i].Taskid, tasks[i].Title);
    }

    for (i = 0; i < scheduledTasks.length; i++) {
      scheduledTaskMap.set(
        scheduledTasks[i].Scheduledid,
        taskMap.get(scheduledTasks[i].Taskid)
      );
    }

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
              <td>{scheduledTaskMap.get(scheduledTask.Scheduledid)}</td>
              <td>{scheduledTask.ScheduledDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScheduledTasks;
