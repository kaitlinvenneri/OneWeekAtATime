import React, { Component } from "react";

class ScheduledTaskTable extends Component {
  render() {
    const { scheduledTasks, onDelete } = this.props;

    let scheduledTaskMap = new Map();
    let scheduledTaskArray = [];

    let i;
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
          title: scheduledTasks[i].title,
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
          title: scheduledTasks[i].title,
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
                  <div className="d-flex align-items-center" key={i}>
                    {date.date}
                    <button
                      onClick={() => onDelete(date.id, scheduledTask.id)}
                      className="btn btn-sm btn-danger py-0 ml-1"
                    >
                      x
                    </button>
                  </div>
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
