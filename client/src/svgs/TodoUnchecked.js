import React, { Component } from 'react';

class TodoUnchecked extends Component {
  render() {
    const { editing, scheduling, onClick, task } = this.props;

    let classString = '';

    if (editing) {
      classString = 'bi bi-square mr-1';
    } else {
      classString = 'bi bi-square mr-2';
    }

    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className={classString}
        fill={
          editing === false && scheduling === false ? 'currentColor' : 'grey'
        }
        xmlns="http://www.w3.org/2000/svg"
        style={
          editing === false && scheduling === false ? { cursor: 'pointer' } : {}
        }
        onClick={
          editing === false && scheduling === false ? () => onClick(task) : null
        }
      >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
      </svg>
    );
  }
}

export default TodoUnchecked;
