import React, { Component } from "react";
import ScheduleTaskForm from "./ScheduleTaskForm";

class ScheduledTaskTable extends Component {
  render() {
    const { scheduledTasks, onDelete, onSchedule } = this.props;

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
          taskId: scheduledTasks[i].taskId,
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
          taskId: scheduledTasks[i].taskId,
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
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {scheduledTaskArray.map((scheduledTask) => (
            <tr key={scheduledTask.taskId}>
              <td>{scheduledTask.title}</td>
              <td>
                <b>Scheduled on:</b>
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
              <td>
                <b>Schedule for more dates:</b>
                <ScheduleTaskForm
                  task={scheduledTask}
                  onSchedule={onSchedule}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScheduledTaskTable;
