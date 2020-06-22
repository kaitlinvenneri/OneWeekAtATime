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
    const { task } = this.props;

    const labelStyle = {
      textDecoration: "line-through",
    };

    return (
      <div className="border rounded mb-3 pt-3 pl-3 pr-3">
        <div className="form-group form-check d-flex">
          <input
            type="checkbox"
            className="form-check-input"
            id={task.scheduledId}
            checked={this.state.completionStatus}
            onChange={this.changeSelectedState}
          />
          <label
            className="form-check-label"
            htmlFor={task.scheduledId}
            style={task.completionStatus === 1 ? labelStyle : null}
          >
            {task.title}
          </label>
          <button className="btn btn-sm btn-danger py-0 ml-1">x</button>
        </div>
      </div>
    );
  }
}

export default WeekViewTask;
