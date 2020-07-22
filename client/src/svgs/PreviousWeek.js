import React, { Component } from 'react';

class PreviousWeek extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <svg
        width="1.7em"
        height="1.7em"
        viewBox="0 0 16 16"
        className="bi bi-chevron-left mt-1"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    );
  }
}

export default PreviousWeek;
