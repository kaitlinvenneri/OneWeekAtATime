import React, { Component } from "react";
import Weekday from "./Weekday";

class WeekView extends Component {
  state = {};
  render() {
    const { weekScheduled, onDelete } = this.props;

    return (
      <div className="d-flex flex-row">
        {weekScheduled.map((day) => (
          <Weekday key={day.date} day={day} onDelete={onDelete} />
        ))}
      </div>
    );
  }
}

export default WeekView;
