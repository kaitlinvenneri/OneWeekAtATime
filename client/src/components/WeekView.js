import React, { Component } from "react";
import Weekday from "./Weekday";

class WeekView extends Component {
  state = {};
  render() {
    const { weekScheduled, onDelete } = this.props;

    let firstDay;
    let lastDay;

    if (weekScheduled.length > 0) {
      firstDay = weekScheduled[0].date;
      lastDay = weekScheduled[6].date;
    }

    return (
      <>
        <div className="d-flex flex-row justify-content-center mt-2">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-calendar-date mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
            <path
              fillRule="evenodd"
              d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
            />
            <path
              fillRule="evenodd"
              d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-calendar-week mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
            />
            <path
              fillRule="evenodd"
              d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
            />
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
          </svg>
          <svg
            width="1.7em"
            height="1.7em"
            viewBox="0 0 16 16"
            className="bi bi-chevron-left mt-1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>

          <h3 className="mx-2">
            {firstDay} - {lastDay}
          </h3>
          <svg
            width="1.7em"
            height="1.7em"
            viewBox="0 0 16 16"
            className="bi bi-chevron-right mt-1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <div className="d-flex flex-row">
          {weekScheduled.map((day) => (
            <Weekday key={day.date} day={day} onDelete={onDelete} />
          ))}
        </div>
      </>
    );
  }
}

export default WeekView;
