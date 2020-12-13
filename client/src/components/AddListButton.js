import React, { Component } from 'react';
import AddList from '../svgs/AddList';

class AddListButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" className="btn btn-success mt-2 ml-2">
        <div className="d-flex justify-content-center">
          <AddList />
          New List
        </div>
      </button>
    );
  }
}

export default AddListButton;
