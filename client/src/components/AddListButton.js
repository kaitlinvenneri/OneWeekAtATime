import React, { Component } from 'react';
import AddList from '../svgs/AddList';

class AddListButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" class="btn btn-success mt-2 ml-2">
        <AddList />
        New List
      </button>
    );
  }
}

export default AddListButton;
