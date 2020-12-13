import React, { Component } from 'react';
import AddList from '../svgs/AddList';

class AddListButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button
        type="button"
        data-toggle="modal"
        data-target="#addListModal"
        className="btn btn-success mx-2"
      >
        <div
          className="d-flex justify-content-center"
          style={{ width: '100%' }}
        >
          <AddList />
          New List
        </div>
      </button>
    );
  }
}

export default AddListButton;
