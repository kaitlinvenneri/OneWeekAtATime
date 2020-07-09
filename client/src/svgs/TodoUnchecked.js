import React, { Component } from 'react';

class TodoUnchecked extends Component {
  render() {
    const { editing, onClick, task } = this.props;

    let classString = '';

    if (editing) {
      classString = 'bi bi-check-square mr-1';
    } else {
      classString = 'bi bi-check-square mr-2';
    }

    return (
      <svg
        width="1.25em"
        height="1.25em"
        viewBox="0 0 16 16"
        className={classString}
        fill={editing === true ? 'grey' : 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        style={editing === true ? {} : { cursor: 'pointer' }}
        onClick={editing === true ? null : () => onClick(task)}
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
    );
  }
}

export default TodoUnchecked;
