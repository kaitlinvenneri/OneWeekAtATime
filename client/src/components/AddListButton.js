import React, { Component } from 'react';
import AddList from '../svgs/AddList';

class AddListButton extends Component {
  render() {
    return (
      <button
        type="button"
        data-toggle="modal"
        data-target="#addListModal"
        className="btn btn-success"
      >
        <AddList />
        New Task List
      </button>
    );
  }
}

export default AddListButton;
