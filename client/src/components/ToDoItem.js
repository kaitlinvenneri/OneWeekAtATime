import React, { Component } from 'react';
import axios from 'axios';
import TodoChecked from './../svgs/TodoChecked';
import TodoUnchecked from './../svgs/TodoUnchecked';
import TodoEdit from './../svgs/TodoEdit';
import TodoDelete from '../svgs/TodoDelete';
import PlusTask from '../svgs/PlusTask';

//Component for To Do Item within the To Do List
class ToDoItem extends Component {
  state = {
    inEditState: false,
    newTitle: this.props.task.title,
    task: this.props.task,
  };

  //Update state if given new props from parent component
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

  //Handle editing the title of a task
  handleEditSave = async () => {
    let updatedTask = this.state.task;
    updatedTask.title = this.state.newTitle;

    //Update the title of the task
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

    //Save updated title of task to the database
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

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleEditSave();
    }
  };

  //Handle scheduling a task to a chosen date in the WeekView on the Planner Page
  handleAddingtoWeekday = async () => {
    const { weekday, onAddToWeekday, onSchedule } = this.props;

    await onSchedule(this.state.task.taskId, weekday.date);

    onAddToWeekday();
  };

  render() {
    const { onDelete, onChangeCompletion, fromPlanner } = this.props;

    let labelStyle = {};

    //Set label style based on if the task is completed or not
    if (this.state.task.completionStatus === 1) {
      //if task is completed, cross it out
      labelStyle = { fontSize: '20px', textDecoration: 'line-through' };
    } else {
      labelStyle = { fontSize: '20px' };
    }

    return (
      <div className="d-flex flex-row justify-content-between ml-1">
        <div className="d-inline-flex flex-row align-items-center">
          <div>
            {fromPlanner ? (
              <PlusTask onClick={this.handleAddingtoWeekday} />
            ) : this.state.task.completionStatus === 1 ? (
              <TodoChecked
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
                id="taskEditInput"
                value={this.state.newTitle}
                size="50"
                maxLength="50"
                style={{
                  fontSize: '20px',
                  height: '35px',
                  color: 'black',
                }}
                onChange={(e) => this.setState({ newTitle: e.target.value })}
                onKeyDown={this.handleKeyDown}
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
        {!fromPlanner && (
          <div className="d-inline-flex flex-row ml-3 mt-1">
            {this.state.task.completionStatus === 1 ? (
              <></>
            ) : (
              <div className="d-flex flex-row align-items-center">
                <TodoEdit
                  editing={this.state.inEditState}
                  onClick={this.handleEditButton}
                />
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
        )}
      </div>
    );
  }
}

export default ToDoItem;
