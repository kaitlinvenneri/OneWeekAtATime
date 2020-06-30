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
      <div className="border rounded mb-3 pt-2 pl-3 pr-3 bg-light d-flex flex-column">
        <label
          className="label mb-2"
          htmlFor={task.scheduledId}
          style={task.completionStatus === 1 ? labelStyle : null}
        >
          {task.title}
        </label>
        <div className="d-flex flex-row flex-wrap justify-content-around">
          {this.state.completionStatus === 0 ? (
            <button
              className="btn btn-success mb-3"
              id={task.scheduledId}
              onClick={this.changeSelectedState}
            >
              Check
            </button>
          ) : (
            <button
              className="btn btn-warning mb-3"
              id={task.scheduledId}
              onClick={this.changeSelectedState}
            >
              Uncheck
            </button>
          )}

          <button
            onClick={() => onDelete(task.scheduledId, task.taskId)}
            className="btn btn-danger mb-3"
          >
            Unschedule
          </button>
        </div>
      </div>
    );
  }
}

export default WeekViewTask;
