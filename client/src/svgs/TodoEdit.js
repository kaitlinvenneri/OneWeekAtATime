import React, { Component } from 'react';

class TodoEdit extends Component {
  render() {
    const { editing, onClick, scheduling } = this.props;

    return (
      <svg
        width="1.3em"
        height="1.3em"
        viewBox="0 0 16 16"
        className="bi bi-pencil-square mr-1"
        fill={
          editing === false && scheduling === false ? 'currentColor' : 'grey'
        }
        xmlns="http://www.w3.org/2000/svg"
        style={
          editing === false && scheduling === false ? { cursor: 'pointer' } : {}
        }
        onClick={editing === false && scheduling === false ? onClick : null}
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fillRule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
    );
  }
}

export default TodoEdit;
