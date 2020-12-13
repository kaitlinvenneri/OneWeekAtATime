import React, { Component } from 'react';

class WeekViewTaskChecked extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <svg
        width="1.1em"
        height="1.1em"
        viewBox="0 0 16 16"
        className="bi bi-check-square-fill mr-2"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <path
          fillRule="evenodd"
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
    );
  }
}

export default WeekViewTaskChecked;