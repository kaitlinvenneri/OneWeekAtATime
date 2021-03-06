import React, { Component } from 'react';

class MenuLines extends Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.7em"
        height="1.7em"
        fill="currentColor"
        className="bi bi-list pt-1"
        viewBox="0 0 16 16"
        style={{ cursor: 'pointer' }}
        id="dropdownMenuButton"
        data-toggle="dropdown"
        type="button"
      >
        <path
          fillRule="evenodd"
          d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    );
  }
}

export default MenuLines;
