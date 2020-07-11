import React, { Component } from 'react';
import axios from 'axios';
import TodoChecked from './../svgs/TodoChecked';
import TodoUnchecked from './../svgs/TodoUnchecked';
import TodoEdit from './../svgs/TodoEdit';
import TodoSchedule from './../svgs/TodoSchedule';
import TodoViewScheduled from './../svgs/TodoViewScheduled';
import TodoDelete from '../svgs/TodoDelete';

class ToDoItem extends Component {
  state = {
    inEditState: false,
    newTitle: this.props.task.title,
    task: this.props.task,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.task !== prevProps.task ||
      this.props.task !== prevState.task
    ) {
      this.setState({ task: this.props.task });
    }
  }

  handleEditButton = () => {
    this.setState({ inEditState: !this.state.inEditState });
  };

  handleEditSave = async () => {
    let updatedTask = this.state.task;
    updatedTask.title = this.state.newTitle;

    this.setState(
      (state) => ({
        task: updatedTask,
      }),
      () => {
        this.setState({ inEditState: !this.state.inEditState });
      }
    );

    let options = {
      params: {
        id: this.state.task.taskId,
        title: this.state.newTitle,
      },
    };

    //TODO: ENSURE TITLE IS NOT TOO LONG before calling server to update task title
    await axios.get('http://localhost:4000/task/update-title', options);
  };

  handleEditCancel = () => {
    //Reset newTitle state and change back edit state
    this.setState(
      (state) => ({
        newTitle: this.props.task.title,
      }),
      () => {
        this.setState({ inEditState: !this.state.inEditState });
      }
    );
  };

  render() {
    const { onDelete, onChangeCompletion } = this.props;

    let labelStyle = {};

    if (this.state.task.completionStatus === 1) {
      labelStyle = { fontSize: '20px', textDecoration: 'line-through' };
    } else {
      labelStyle = { fontSize: '20px' };
    }

    return (
      <div className="d-flex flex-row justify-content-between ml-1">
        <div className="d-inline-flex flex-row align-items-center">
          <div>
            {this.state.task.completionStatus === 1 ? (
              <TodoChecked
                editing={this.state.inEditState}
                onClick={onChangeCompletion}
                task={this.state.task}
              />
            ) : (
              <TodoUnchecked
                editing={this.state.inEditState}
                onClick={onChangeCompletion}
                task={this.state.task}
              />
            )}
          </div>
          {this.state.inEditState === true ? (
            <div className="d-flex flex-row align-items-center">
              <input
                type="text"
                className="form-control"
                id="taskInput"
                value={this.state.newTitle}
                size="50"
                maxlength="50"
                style={{
                  fontSize: '20px',
                  height: '35px',
                  color: 'black',
                }}
                onChange={(e) => this.setState({ newTitle: e.target.value })}
              ></input>
              <button
                className="btn btn-sm btn-outline-success ml-2"
                onClick={this.handleEditSave}
                disabled={this.state.newTitle.length === 0}
              >
                Save
              </button>
              <button
                className="btn btn-sm btn-outline-danger ml-2"
                onClick={this.handleEditCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-1 ml-2" style={labelStyle}>
              {this.state.task.title}
            </div>
          )}
        </div>
        <div className="d-inline-flex flex-row ml-3 mt-1">
          {this.state.task.completionStatus === 1 ? (
            <></>
          ) : (
            <div>
              <TodoEdit
                editing={this.state.inEditState}
                onClick={this.handleEditButton}
              />
              <TodoSchedule editing={this.state.inEditState} />
              <TodoViewScheduled editing={this.state.inEditState} />
            </div>
          )}
          <div>
            <TodoDelete
              editing={this.state.inEditState}
              onDelete={onDelete}
              task={this.state.task}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoItem;
