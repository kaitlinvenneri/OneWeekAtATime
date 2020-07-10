import React, { Component } from 'react';
import axios from 'axios';

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
      await axios.get('http://localhost:4000/scheduled-task/mark-complete', options);
    } else {
      await axios.get('http://localhost:4000/scheduled-task/mark-incomplete', options);
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
              <svg
                width="1.1em"
                height="1.1em"
                viewBox="0 0 16 16"
                className="bi bi-check-square mr-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.changeSelectedState}
                style={{ cursor: 'pointer' }}
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
            ) : (
              <svg
                width="1.1em"
                height="1.1em"
                viewBox="0 0 16 16"
                className="bi bi-check-square-fill mr-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.changeSelectedState}
                style={{ cursor: 'pointer' }}
              >
                <path
                  fillRule="evenodd"
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                />
              </svg>
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
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 0 16 16"
            className="bi bi-calendar-week mr-1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: 'pointer' }}
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
            width="1.25em"
            height="1.25em"
            viewBox="0 0 16 16"
            className="bi bi-trash"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => onDelete(task.scheduledId, task.taskId)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default WeekViewTask;
