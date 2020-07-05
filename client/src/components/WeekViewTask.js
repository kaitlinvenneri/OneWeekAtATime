import React, { Component } from "react";
import axios from "axios";

class WeekViewTask extends Component {
  state = { completionStatus: this.props.task.completionStatus };

  changeSelectedState = async () => {
    const { task } = this.props;
    if (task.completionStatus === 0) {
      task.completionStatus = 1;
    } else {
      task.completionStatus = 0;
    }
    this.setState({ completionStatus: task.completionStatus });
    //console.log(task.completionStatus);

    let options = {
      params: {
        id: task.scheduledId,
      },
    };

    if (task.completionStatus === 1) {
      await axios.get(
        "http://localhost:4000/scheduled-task/mark-complete",
        options
      );
    } else {
      await axios.get(
        "http://localhost:4000/scheduled-task/mark-incomplete",
        options
      );
    }
  };

  render() {
    const { task, onDelete } = this.props;

    const labelStyle = {
      textDecoration: "line-through",
    };

    return (
      <div
        className="mt-2 pt-1 pl-2 pr-3 d-flex flex-column"
        style={{
          backgroundColor: "#e1e6ea",
          borderStyle: "solid",
          borderRadius: "5px",
          borderColor: "#3f4d5a",
          borderWidth: "1px",
        }}
      >
        <label
          className="label mb-2"
          style={task.completionStatus === 1 ? labelStyle : null}
        >
          {task.title}
        </label>
        <div className="d-flex flex-row justify-content-start mr-2">
          {this.state.completionStatus === 0 ? (
            <svg
              width="1.25em"
              height="1.25em"
              viewBox="0 0 16 16"
              className="bi bi-calendar-check mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.changeSelectedState}
              style={{ cursor: "pointer" }}
            >
              <path
                fillRule="evenodd"
                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
              />
              <path
                fillRule="evenodd"
                d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          ) : (
            <svg
              width="1.25em"
              height="1.25em"
              viewBox="0 0 16 16"
              className="bi bi-calendar-check-fill mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.changeSelectedState}
              style={{ cursor: "pointer" }}
            >
              <path
                fillRule="evenodd"
                d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm10.854 3.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
              />
            </svg>
          )}
          <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 16 16"
            className="bi bi-calendar-minus mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => onDelete(task.scheduledId, task.taskId)}
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
            />
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
            width="1.25em"
            height="1.25em"
            viewBox="0 0 16 16"
            className="bi bi-calendar-event mb-2"
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
            <rect width="2" height="2" x="11" y="6" rx=".5" />
          </svg>
        </div>
      </div>
    );
  }
}

export default WeekViewTask;
