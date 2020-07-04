import React, { Component } from "react";
import WeekViewTask from "./WeekViewTask";

class Weekday extends Component {
  state = {};
  render() {
    const { day, onDelete } = this.props;
    return (
      <div className="card mx-auto" style={{ width: "14%" }}>
        <h5 className="card-header text-center">
          {day.weekday}
          <br />
          {day.date}
        </h5>
        <div className="card-body">
          {day.scheduledTasks.map((task) => (
            <WeekViewTask
              task={task}
              onDelete={onDelete}
              key={task.scheduledId}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Weekday;
