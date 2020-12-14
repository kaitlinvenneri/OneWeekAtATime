import React, { Component } from 'react';
import AddList from '../svgs/AddList';

class AddListButton extends Component {
  render() {
    return (
      <button
        type="button"
        data-toggle="modal"
        data-target="#addListModal"
        className="btn btn-success mx-2"
        style={{ width: '150px' }}
      >
        <AddList />
        New List
      </button>
    );
  }
}

export default AddListButton;
