import React, { Component } from 'react';

class MenuLines extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        fill="currentColor"
        className="bi bi-list pt-1"
        viewBox="0 0 16 16"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <path
          fill-rule="evenodd"
          d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    );
  }
}

export default MenuLines;
