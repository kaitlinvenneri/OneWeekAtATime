import React, { Component } from 'react';
import axios from 'axios';
import WeekViewTaskChecked from './../svgs/WeekViewTaskChecked';
import WeekViewTaskUnchecked from '../svgs/WeekViewTaskUnchecked';
import WeekViewTaskDelete from '../svgs/WeekViewTaskDelete';

//WeekViewTask component within the Weekday of the Weekview on the Planner Page
class WeekViewTask extends Component {
  state = { completionStatus: this.props.task.completionStatus };

  //Update completion state of scheduled task
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

    //console.log(task);

    let backgroundColor = 'white';
    let borderColor = 'black';

    // TODO: Make this into a map that comes from another file
    if (task.color === 'gray') {
      backgroundColor = '#e1e6ea';
      borderColor = '#4b5968';
    } else if (task.color === 'blue') {
      backgroundColor = '#e3f2fd';
      borderColor = '#0c66a6';
    } else if (task.color === 'pink') {
      backgroundColor = '#ffcce6';
      borderColor = '#cc0069';
    } else if (task.color === 'green') {
      backgroundColor = '#b3e6b3';
      borderColor = '#194d33';
    } else if (task.color === 'orange') {
      backgroundColor = '#ffe0b3';
      borderColor = '#e65c00';
    }

    let labelStyle = {};

    if (task.completionStatus === 1) {
      labelStyle = { textDecoration: 'line-through' };
    }

    return (
      <div
        className="card mx-2 my-2"
        style={{
          backgroundColor: `${backgroundColor}`,
          border: `2px solid ${borderColor}`,
        }}
      >
        <div
          className="card-header d-flex justify-content-start align-items-center px-2 py-0"
          style={{
            borderBottom: 'none',
            backgroundColor: `${backgroundColor}`,
            color: `${borderColor}`,
          }}
        >
          <h6 className="my-0">{this.props.task.name}</h6>
        </div>
        <div
          className="card-body pt-0 pb-0 px-2"
          //style={{ backgroundColor: `${backgroundColor}` }}
        >
          <div
            className="mb-2 pt-1 px-2 d-flex flex-column"
            style={{
              borderStyle: 'solid',
              borderRadius: '5px',
              borderColor: '#3f4d5a',
              borderWidth: '1px',
              backgroundColor: 'white',
            }}
          >
            <div className="d-flex flex-row align-items-start">
              <div className="d-flex flex-row align-items-start">
                {this.state.completionStatus === 0 ? (
                  <WeekViewTaskUnchecked onClick={this.changeSelectedState} />
                ) : (
                  <WeekViewTaskChecked onClick={this.changeSelectedState} />
                )}
              </div>
              <label className="label" style={labelStyle}>
                {task.title}
              </label>
            </div>
            <div className="d-flex flex-row justify-content-end mb-2">
              <WeekViewTaskDelete task={task} onClick={onDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeekViewTask;
