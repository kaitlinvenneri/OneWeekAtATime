import React, { Component } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddTaskForm from './AddTaskForm';
import MenuLines from './../svgs/MenuLines';
import Check from './../svgs/Check';

//To Do List Component on the To Do Page
class ToDoList extends Component {
  state = {
    tasks: [],
    color: this.props.category.color,
    title: this.props.category.name,
  };

  // //Update state if given new props from parent component
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.props.category !== prevProps.category ||
  //     this.props.category !== prevState.category
  //   ) {
  //     this.setState({
  //       color: this.props.category.color,
  //       title: this.props.category.name,
  //     });
  //   }
  // }

  async componentDidMount() {
    this.getListTasks();
  }

  getListTasks = async () => {
    const { category } = this.props;

    let options = {
      params: {
        categoryId: category.categoryId,
      },
    };

    //get tasks from the server that correspond with this list (category)
    await axios
      .get('http://localhost:4000/category/tasks', options)
      .then((response) => {
        this.setState((state) => ({
          tasks: response.data,
        }));
      });
  };

  handleChangingTaskCompletionStatus = async (task) => {
    let options = {
      params: {
        id: task.taskId,
      },
    };

    //Update task completion status on server
    if (task.completionStatus === 1) {
      await axios.get('http://localhost:4000/task/mark-incomplete', options);
    } else {
      await axios.get('http://localhost:4000/task/mark-complete', options);
    }

    //Retrieve updated tasks
    await axios.get('http://localhost:4000/tasks').then((response) => {
      this.setState((state) => ({
        tasks: response.data,
      }));
    });
  };

  handleTaskDelete = async (taskId) => {
    let options = {
      params: {
        id: taskId,
      },
    };

    //Optimistic update of state prior to calling server
    const tasks = this.state.tasks.filter((task) => task.taskId !== taskId);

    this.setState({ tasks });

    //Delete task on the server
    await axios.get('http://localhost:4000/task/delete', options);
  };

  handleTaskScheduling = async (taskId, taskDate) => {
    let options = {
      params: {
        id: taskId,
        date: taskDate,
      },
    };

    //Schedule task for given date on the server
    await axios.get('http://localhost:4000/task/schedule', options);
  };

  handleTaskAdding = async (taskTitle) => {
    const { category } = this.props;

    //TODO: Change this to be an optimistic update (it's pessimistic currently)
    let options = {
      params: {
        title: taskTitle,
        categoryId: category.categoryId,
      },
    };

    await axios
      .get('http://localhost:4000/task/add', options)
      .then(async () => {
        this.getListTasks();
      });
  };

  render() {
    const { category, weekday, onAddToWeekday } = this.props;

    let backgroundColor = 'white';
    let borderColor = 'black';

    // TODO: Make this into a map that comes from another file
    if (category.color === 'gray') {
      backgroundColor = '#e1e6ea';
      borderColor = '#4b5968';
    } else if (category.color === 'blue') {
      backgroundColor = '#e3f2fd';
      borderColor = '#0c66a6';
    } else if (category.color === 'pink') {
      backgroundColor = '#ffcce6';
      borderColor = '#cc0069';
    } else if (category.color === 'green') {
      backgroundColor = '#b3e6b3';
      borderColor = '#194d33';
    } else if (category.color === 'orange') {
      backgroundColor = '#ffe0b3';
      borderColor = '#e68a00';
    }

    return (
      <div
        className="card mx-2 mb-3"
        style={{
          width: '400px',
          border: `2px solid ${borderColor}`,
        }}
      >
        <div
          className="card-header d-flex justify-content-between align-items-center px-2"
          style={{
            borderBottom: `2px solid ${borderColor}`,
            backgroundColor: `${backgroundColor}`,
            color: `${borderColor}`,
          }}
        >
          <h5 className="my-0">{this.state.title}</h5>
          <div className="dropdown">
            <MenuLines />
            {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Edit List Name
              </a>
              <div className="dropdown-divider"></div>
              <h6 className="dropdown-header">List Colour</h6>
              <a className="dropdown-item" href="#">
                <div className="d-flex justify-content-between">
                  Gray
                  {this.state.color === 'gray' && <Check />}
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="d-flex justify-content-between">
                  Blue
                  {this.state.color === 'blue' && <Check />}
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="d-flex justify-content-between">
                  Pink
                  {this.state.color === 'pink' && <Check />}
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="d-flex justify-content-between">
                  Green
                  {this.state.color === 'green' && <Check />}
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="d-flex justify-content-between">
                  Orange
                  {this.state.color === 'orange' && <Check />}
                </div>
              </a>
            </div> */}
          </div>
        </div>
        <div
          className="card-body py-2 px-2"
          style={{ backgroundColor: `${backgroundColor}` }}
        >
          {this.state.tasks.map((task) => (
            <ToDoItem
              key={task.taskId}
              task={task}
              onDelete={this.handleTaskDelete}
              onChangeCompletion={this.handleChangingTaskCompletionStatus}
              onSchedule={this.handleTaskScheduling}
              weekday={weekday}
              onAddToWeekday={onAddToWeekday}
            />
          ))}
          <AddTaskForm
            categoryId={category.categoryId}
            onAdd={this.handleTaskAdding}
          />
        </div>
      </div>
    );
  }
}

export default ToDoList;
