import React, { Component } from "react";
import WeekViewTask from "./WeekViewTask";

class Weekday extends Component {
  state = {};
  render() {
    const { day, onDelete } = this.props;
    return (
      <div
        className="card mx-auto"
        style={{ width: "14%", borderColor: "#083a5e" }}
      >
        <h5
          className="card-header text-center"
          style={{ backgroundColor: "#0c66a6", color: "white" }}
        >
          {day.weekday}
          <br />
          {day.date}
        </h5>
        <div className="card-body pl-2 pr-2 pb-2 pt-0">
          {day.scheduledTasks.map((task) => (
            <WeekViewTask
              task={task}
              onDelete={onDelete}
              key={task.scheduledId}
            />
          ))}
        </div>
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          className="bi bi-journal-plus ml-1 mb-1"
          fill="#002080"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
        >
          <path d="M4 1h5v1H4a1 1 0 0 0-1 1H2a2 2 0 0 1 2-2zm10 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1zM2 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2z" />
          <path
            fillRule="evenodd"
            d="M13.5 1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V1.5a.5.5 0 0 1 .5-.5z"
          />
          <path
            fillRule="evenodd"
            d="M13 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
          />
        </svg>
      </div>
    );
  }
}

export default Weekday;
