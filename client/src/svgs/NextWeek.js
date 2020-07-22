import React, { Component } from 'react';

class NextWeek extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <svg
        width="1.7em"
        height="1.7em"
        viewBox="0 0 16 16"
        className="bi bi-chevron-right mt-1"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    );
  }
}

export default NextWeek;
