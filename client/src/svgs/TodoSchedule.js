import React, { Component } from 'react';

class TodoSchedule extends Component {
  render() {
    const { editing, onClick, scheduling } = this.props;
    return (
      <svg
        width="1.1em"
        height="1.1em"
        viewBox="0 0 16 16"
        className="bi bi-calendar-plus mx-1"
        fill={
          editing === false && scheduling === false ? 'currentColor' : 'grey'
        }
        xmlns="http://www.w3.org/2000/svg"
        style={
          editing === false && scheduling === false ? { cursor: 'pointer' } : {}
        }
        onClick={editing === false && scheduling === false ? onClick : null}
      >
        <path
          fillRule="evenodd"
          d="M8 7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
        />
        <path
          fillRule="evenodd"
          d="M7.5 9.5A.5.5 0 0 1 8 9h2a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0v-2z"
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
    );
  }
}

export default TodoSchedule;
