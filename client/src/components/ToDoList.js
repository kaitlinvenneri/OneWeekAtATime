import React, { Component } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddTaskForm from './AddTaskForm';

class ToDoList extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
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

    if (task.completionStatus === 1) {
      await axios.get('http://localhost:4000/task/mark-incomplete', options);
    } else {
      await axios.get('http://localhost:4000/task/mark-complete', options);
    }

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

    const tasks = this.state.tasks.filter((task) => task.taskId !== taskId);

    this.setState({ tasks });

    await axios.get('http://localhost:4000/task/delete', options);
  };

  handleTaskScheduling = async (taskId, taskDate) => {
    //TODO: Change this to be an optimistic update (it's pessimistic currently)
    let options = {
      params: {
        id: taskId,
        date: taskDate,
      },
    };

    await axios
      .get('http://localhost:4000/task/schedule', options)
      .then(async () => {
        await axios.get('http://localhost:4000/task/mark-scheduled', options);
      })
      .then(async () => {
        const { data: tasks } = await axios.get('http://localhost:4000/tasks');
        this.setState({ tasks });
      });
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

  handleTaskUnscheduling = async (scheduledId, taskId) => {
    let options = {
      params: {
        scheduledId: scheduledId,
        taskId: taskId,
      },
    };

    await axios
      .get('http://localhost:4000/scheduled-task/delete', options)
      .then(async (response) => {
        let unscheduleNeeded = false;

        let taskOptions = {
          params: {
            id: response.data.taskId,
          },
        };

        //Get all instances of scheduled tasks with this taskId
        const { data: scheduledTasks } = await axios.get(
          'http://localhost:4000/scheduled-tasks/get-by-task-id',
          taskOptions
        );

        //If there are no scheduled tasks with this task id, uncheduling is required
        if (scheduledTasks.length === 0) {
          unscheduleNeeded = true;
        }

        //Unschedule the task (mark scheduledStatus 0)
        if (unscheduleNeeded) {
          await axios.get(
            'http://localhost:4000/task/mark-unscheduled',
            taskOptions
          );
        }
      })
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
                  Choose a task to add to {weekday.weekday},{' '}
                  {weekday.dateString}:
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
