import React, { Component } from 'react';

class SelectWeek extends Component {
  render() {
    return (
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        className="bi bi-calendar-event mr-2"
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
        <rect width="2" height="2" x="11" y="6" rx=".5" />
      </svg>
    );
  }
}

export default SelectWeek;
