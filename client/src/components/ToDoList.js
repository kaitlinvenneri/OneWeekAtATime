import React, { Component } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddTaskForm from './AddTaskForm';
import MenuLines from './../svgs/MenuLines';
import DeleteListModal from './DeleteListModal';
import { categoryColors } from '../styling/CategoryColors';

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
    await this.getListTasks();
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
    await this.getListTasks();
  };

  handleTaskDelete = async (taskId) => {
    const { updateWeekview } = this.props;

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

    await updateWeekview();
  };

  handleTaskScheduling = async (taskId, taskDate) => {
    const { updateWeekview } = this.props;

    let options = {
      params: {
        id: taskId,
        date: taskDate,
      },
    };

    //Schedule task for given date on the server
    await axios.get('http://localhost:4000/task/schedule', options);

    await updateWeekview();
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
    const { onDelete, category, weekday, onAddToWeekday, updateWeekview } =
      this.props;

    //Default background color and border color (just in case)
    let backgroundColor = 'white';
    let borderColor = 'black';

    //Setting the backgroung color and border color from category color map
    backgroundColor = categoryColors.get(category.color).backgroundColor;
    borderColor = categoryColors.get(category.color).borderColor;

    return (
      <div
        className="card mx-2 mb-3"
        style={{
          //width: '400px',
          backgroundColor: `${backgroundColor}`,
          border: `2px solid ${borderColor}`,
        }}
      >
        <div
          className="card-header d-flex justify-content-between align-items-center px-2 py-2"
          style={{
            borderBottom: `2px solid ${borderColor}`,
            backgroundColor: `${backgroundColor}`,
            color: `${borderColor}`,
          }}
        >
          <h5 className="my-0">{this.state.title}</h5>
          <div className="dropdown">
            <MenuLines />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {/* <button className="dropdown-item btn btn-light">Edit List</button>
              <div className="dropdown-divider"></div> */}
              <button
                className="dropdown-item btn btn-light"
                type="button"
                data-toggle="modal"
                data-target={'#deleteListModal' + category.categoryId}
              >
                Delete List
              </button>
            </div>
          </div>
        </div>
        <div className="card-body py-2 px-2">
          {this.state.tasks.map((task) => (
            <ToDoItem
              key={task.taskId}
              task={task}
              onDelete={this.handleTaskDelete}
              onChangeCompletion={this.handleChangingTaskCompletionStatus}
              onSchedule={this.handleTaskScheduling}
              weekday={weekday}
              onAddToWeekday={onAddToWeekday}
              updateWeekview={updateWeekview}
            />
          ))}
          <AddTaskForm
            categoryId={category.categoryId}
            onAdd={this.handleTaskAdding}
          />
          <DeleteListModal onDelete={onDelete} category={category} />
        </div>
      </div>
    );
  }
}

export default ToDoList;
