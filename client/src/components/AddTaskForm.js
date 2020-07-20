import React, { Component } from 'react';
import TodoAdd from './../svgs/TodoAdd';

class AddTaskForm extends Component {
  state = {
    title: '',
  };

  handleAddClick = async () => {
    const { onAdd } = this.props;

    await onAdd(this.state.title).then(() => {
      this.setState({ title: '' });
    });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && this.state.title.length > 0) {
      this.handleAddClick();
    }
  };

  render() {
    return (
      <div className="d-flex flex-row align-items-center">
        <div>
          <TodoAdd />
        </div>
        <input
          type="text"
          className="form-control"
          id="taskInput"
          placeholder="Write grocery list."
          value={this.state.title}
          size="50"
          maxLength="50"
          style={{ fontSize: '20px', height: '35px', color: 'black' }}
          onChange={(e) => this.setState({ title: e.target.value })}
          onKeyDown={this.handleKeyDown}
        ></input>
        <button
          onClick={this.handleAddClick}
          type="submit"
          className="btn btn-sm btn-outline-primary ml-2"
          disabled={this.state.title.length === 0}
        >
          Add
        </button>
      </div>
    );
  }
}

export default AddTaskForm;
