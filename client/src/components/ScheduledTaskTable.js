import React, { Component } from "react";

//TODO: Refactor out the table to make the table a reusable component
class ScheduledTaskTable extends Component {
  render() {
    const { tasks, scheduledTasks } = this.props;

    //console.log(tasks, scheduledTasks);

    //TODO: Move the map setting to ComponentDidMount?
    let taskMap = new Map();
    let scheduledTaskMap = new Map();
    let scheduledTaskArray = [];

    let i;
    for (i = 0; i < tasks.length; i++) {
      taskMap.set(tasks[i].taskId, tasks[i].title);
    }

    for (i = 0; i < scheduledTasks.length; i++) {
      if (scheduledTaskMap.has(scheduledTasks[i].taskId)) {
        let datesToAdd = scheduledTaskMap.get(scheduledTasks[i].taskId).dates;
        let dateWithScheduledId = {
          id: scheduledTasks[i].scheduledId,
          date: scheduledTasks[i].scheduledDate,
        };
        datesToAdd.push(dateWithScheduledId);
        scheduledTaskMap.set(scheduledTasks[i].taskId, {
          id: scheduledTasks[i].taskId,
          title: taskMap.get(scheduledTasks[i].taskId),
          dates: datesToAdd,
        });
      } else {
        let datesToAdd = [];
        let dateWithScheduledId = {
          id: scheduledTasks[i].scheduledId,
          date: scheduledTasks[i].scheduledDate,
        };
        datesToAdd.push(dateWithScheduledId);
        scheduledTaskMap.set(scheduledTasks[i].taskId, {
          id: scheduledTasks[i].taskId,
          title: taskMap.get(scheduledTasks[i].taskId),
          dates: datesToAdd,
        });
      }
    }

    scheduledTaskArray = Array.from(scheduledTaskMap.values());
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Scheduled Tasks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scheduledTaskArray.map((scheduledTask) => (
            <tr key={scheduledTask.id}>
              <td>{scheduledTask.title}</td>
              <td>
                {scheduledTask.dates.map((date, i) => (
                  <div key={i}>{date.date}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScheduledTaskTable;
