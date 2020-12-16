import React, { Component } from 'react';
import axios from 'axios';
import TodoChecked from './../svgs/TodoChecked';
import TodoUnchecked from './../svgs/TodoUnchecked';
import TodoEdit from './../svgs/TodoEdit';
import TodoSchedule from '../svgs/TodoSchedule';
import TodoDelete from '../svgs/TodoDelete';
import ScheduleTaskForm from './ScheduleTaskForm';

//Component for To Do Item within the To Do List
class ToDoItem extends Component {
  state = {
    inEditState: false,
    scheduling: false,
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

  handleScheduling = (taskId, date) => {
    const { onSchedule } = this.props;

    this.setState({ scheduling: false });

    onSchedule(taskId, date);
  };

  handleScheduleButton = () => {
    this.setState({ scheduling: true });
  };

  handleCancelScheduling = () => {
    this.setState({ scheduling: false });
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
    const { onDelete, onChangeCompletion } = this.props;

    let labelStyle = {};

    //Set label style based on if the task is completed or not
    if (this.state.task.completionStatus === 1) {
      //if task is completed, cross it out
      labelStyle = { textDecoration: 'line-through' };
    }

    return (
      <div
        className="mb-2 py-2 pl-2 pr-1 d-flex flex-row justify-content-between align-items-stretch"
        style={{
          borderStyle: 'solid',
          borderRadius: '5px',
          borderColor: '#3f4d5a',
          borderWidth: '1px',
          backgroundColor: 'white',
        }}
      >
        <div className="d-inline-flex flex-row align-items-center">
          <div>
            {this.state.task.completionStatus === 1 ? (
              <TodoChecked
                onClick={onChangeCompletion}
                task={this.state.task}
              />
            ) : (
              <TodoUnchecked
                editing={this.state.inEditState}
                scheduling={this.state.scheduling}
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
                size={this.state.newTitle.length}
                maxLength="50"
                style={{
                  height: '35px',
                  color: 'black',
                  borderColor: 'black',
                }}
                onChange={(e) => this.setState({ newTitle: e.target.value })}
                onKeyDown={this.handleKeyDown}
              ></input>
              <button
                className="btn btn-sm btn-success ml-2"
                onClick={this.handleEditSave}
                disabled={this.state.newTitle.length === 0}
              >
                Save
              </button>
              <button
                className="btn btn-sm btn-danger ml-2"
                onClick={this.handleEditCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="ml-2" style={labelStyle}>
              {this.state.task.title}
            </div>
          )}
        </div>
        {
          <div className="d-inline-flex flex-row ml-3">
            {this.state.task.completionStatus === 1 ? (
              <></>
            ) : (
              <div className="d-flex flex-row align-items-center">
                <TodoEdit
                  editing={this.state.inEditState}
                  scheduling={this.state.scheduling}
                  onClick={this.handleEditButton}
                />
                {this.state.scheduling && (
                  <ScheduleTaskForm
                    task={this.state.task}
                    onSchedule={this.handleScheduling}
                    onCancelScheduling={this.handleCancelScheduling}
                  />
                )}
                <TodoSchedule
                  scheduling={this.state.scheduling}
                  editing={this.state.inEditState}
                  onClick={this.handleScheduleButton}
                />
              </div>
            )}
            <div className="d-flex flex-row align-items-center">
              <TodoDelete
                editing={this.state.inEditState}
                scheduling={this.state.scheduling}
                onDelete={onDelete}
                task={this.state.task}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ToDoItem;
