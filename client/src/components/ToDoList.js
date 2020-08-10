import React, { Component } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddTaskForm from './AddTaskForm';

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
    const { fromPlanner, weekday, onAddToWeekday } = this.props;

    return (
      <table className="table table-striped table-borderless w-auto mx-auto">
        <thead>
          <tr>
            <th scope="col" style={{ fontSize: '20px' }}>
              {fromPlanner ? (
                <span>
                  Choose a task to add to {weekday.weekday} {weekday.dateString}
                  :
                </span>
              ) : (
                'To Do'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <AddTaskForm onAdd={this.handleTaskAdding} />
            </td>
          </tr>
          {this.state.tasks.map((task) => (
            <tr key={task.taskId}>
              <td>
                <ToDoItem
                  task={task}
                  onDelete={this.handleTaskDelete}
                  onChangeCompletion={this.handleChangingTaskCompletionStatus}
                  onSchedule={this.handleTaskScheduling}
                  fromPlanner={fromPlanner}
                  weekday={weekday}
                  onAddToWeekday={onAddToWeekday}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ToDoList;
