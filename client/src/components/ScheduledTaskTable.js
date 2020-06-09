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
      taskMap.set(tasks[i].Taskid, tasks[i].Title);
    }

    for (i = 0; i < scheduledTasks.length; i++) {
      if (scheduledTaskMap.has(scheduledTasks[i].Taskid)) {
        let datesToAdd = scheduledTaskMap.get(scheduledTasks[i].Taskid).dates;
        let dateWithScheduledId = {
          id: scheduledTasks[i].Scheduledid,
          date: scheduledTasks[i].ScheduledDate,
        };
        datesToAdd.push(dateWithScheduledId);
        scheduledTaskMap.set(scheduledTasks[i].Taskid, {
          id: scheduledTasks[i].Taskid,
          title: taskMap.get(scheduledTasks[i].Taskid),
          dates: datesToAdd,
        });
      } else {
        let datesToAdd = [];
        let dateWithScheduledId = {
          id: scheduledTasks[i].Scheduledid,
          date: scheduledTasks[i].ScheduledDate,
        };
        datesToAdd.push(dateWithScheduledId);
        scheduledTaskMap.set(scheduledTasks[i].Taskid, {
          id: scheduledTasks[i].Taskid,
          title: taskMap.get(scheduledTasks[i].Taskid),
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
