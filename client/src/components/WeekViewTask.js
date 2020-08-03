import React, { Component } from 'react';
import axios from 'axios';
import WeekViewTaskChecked from './../svgs/WeekViewTaskChecked';
import WeekViewTaskUnchecked from '../svgs/WeekViewTaskUnchecked';
import WeekViewTaskDelete from '../svgs/WeekViewTaskDelete';

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

    let options = {
      params: {
        id: task.scheduledId,
      },
    };

    if (task.completionStatus === 1) {
      await axios.get(
        'http://localhost:4000/scheduled-task/mark-complete',
        options
      );
    } else {
      await axios.get(
        'http://localhost:4000/scheduled-task/mark-incomplete',
        options
      );
    }
  };

  render() {
    const { task, onDelete } = this.props;

    let labelStyle = {};

    if (task.completionStatus === 1) {
      labelStyle = { fontSize: '18px', textDecoration: 'line-through' };
    } else {
      labelStyle = { fontSize: '18px' };
    }

    return (
      <div
        className="mt-2 pt-1 pl-2 pr-1 d-flex flex-column"
        style={{
          backgroundColor: '#e1e6ea',
          borderStyle: 'solid',
          borderRadius: '5px',
          borderColor: '#3f4d5a',
          borderWidth: '1px',
        }}
      >
        <div className="d-flex flex-row">
          <div>
            {this.state.completionStatus === 0 ? (
              <WeekViewTaskUnchecked onClick={this.changeSelectedState} />
            ) : (
              <WeekViewTaskChecked onClick={this.changeSelectedState} />
            )}
          </div>
          <label
            className="label"
            style={labelStyle}
            //style={task.completionStatus === 1 ? labelStyle : null}
          >
            {task.title}
          </label>
        </div>
        <div className="d-flex flex-row justify-content-end mb-2">
          <WeekViewTaskDelete task={task} onClick={onDelete} />
        </div>
      </div>
    );
  }
}

export default WeekViewTask;
