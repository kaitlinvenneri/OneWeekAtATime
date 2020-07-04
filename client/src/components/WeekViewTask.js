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
      <div className="border rounded mt-2 pt-1 pl-2 pr-3 bg-light d-flex flex-row">
        <div className="d-flex flex-column flex-wrap justify-content-start mr-2">
          {this.state.completionStatus === 0 ? (
            <svg
              width="1.25em"
              height="1.25em"
              viewBox="0 0 16 16"
              className="bi bi-check-square-fill my-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.changeSelectedState}
            >
              <path
                fillRule="evenodd"
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
          ) : (
            <svg
              width="1.25em"
              height="1.25em"
              viewBox="0 0 16 16"
              className="bi bi-check-square my-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.changeSelectedState}
            >
              <path
                fillRule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                fillRule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          )}

          <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 16 16"
            className="bi bi-x-square-fill mb-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => onDelete(task.scheduledId, task.taskId)}
          >
            <path
              fillRule="evenodd"
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.854 4.854a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"
            />
          </svg>
        </div>
        <label
          className="label mb-2"
          style={task.completionStatus === 1 ? labelStyle : null}
        >
          {task.title}
        </label>
      </div>
    );
  }
}

export default WeekViewTask;
