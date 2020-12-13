import React, { Component } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddTaskForm from './AddTaskForm';
import MenuLines from './../svgs/MenuLines';

//To Do List Component on the To Do Page
class ToDoList extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
    //get tasks from the server
    await axios.get('http://localhost:4000/tasks').then((response) => {
      this.setState((state) => ({
        tasks: response.data,
      }));
    });
  }

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
    //TODO: Change this to be an optimistic update (it's pessimistic currently)
    let options = {
      params: {
        title: taskTitle,
      },
    };

    await axios
      .get('http://localhost:4000/task/add', options)
      .then(async () => {
        const { data: tasks } = await axios.get('http://localhost:4000/tasks');
        this.setState({ tasks });
      });
  };

  render() {
    const { weekday, onAddToWeekday } = this.props;

    return (
      <div
        className="card mx-auto mt-4"
        style={{
          width: '30%',
          border: '3px solid #0c66a6',
        }}
      >
        <div
          className="card-header d-flex justify-content-between align-items-center px-2"
          style={{
            borderBottom: '3px solid #0c66a6',
            backgroundColor: '#e3f2fd',
            color: '#0c66a6',
          }}
        >
          <h5 className="my-0">List Category</h5>
          <MenuLines />
        </div>
        <div
          className="card-body py-2 px-2"
          style={{ backgroundColor: '#e3f2fd' }}
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
          <AddTaskForm onAdd={this.handleTaskAdding} />
        </div>
      </div>
    );
  }
}

export default ToDoList;
