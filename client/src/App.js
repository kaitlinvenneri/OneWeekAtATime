import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        tasks: [],
        task: {
            title: ''
        },
        scheduledTasks: [],
        scheduledTask: {
            date: null
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = _ => {
        fetch('http://localhost:4000/tasks')
            .then(response => response.json())
            .then(response => this.setState({tasks: response.data}))
            .catch(err => console.error(err))
    }

    getScheduledTasks = _ => {
        fetch('http://localhost:4000/scheduled-tasks')
            .then(response => response.json())
            .then(response => this.setState({tasks: response.data}))
            .catch(err => console.error(err))
    }

    addTask = _ => {
        const { task } = this.state;
        fetch(`http://localhost:4000/task/add?title=${task.title}`)
            .then(this.getTasks)
            .catch(err => console.error(err))
    }

    scheduleTask = (Taskid) =>
        <div key={Taskid}>
            <input type="date"/>
        </div>


    renderTask = ({Taskid, Title}) =>
        <div key={Taskid}>
            {Title}
            <button key={Taskid} onClick={this.scheduleTask(Taskid)}> Schedule Task </button>
            <input type="date"/>
        </div>

    renderScheduledTask = ({Scheduledid, ScheduledDate}) => <div key={Scheduledid}>{ScheduledDate}</div>

  render() {
      const { tasks, task } = this.state;
      return (
        <div className="App">
            <h1>Welcome to Weekly Planning!</h1>

            <div>
                To add a task, insert task title below and use the "Add Task" button below:
                <br />
                <br />
                <input
                    value={task.title}
                    onChange={e => this.setState({task: {...task, title: e.target.value}})}/>
                <button onClick={this.addTask}> Add Task </button>
            </div>
            <br />
            <hr />
            <h2>Unscheduled Tasks:</h2>
            {tasks.map(this.renderTask)}

            <br />
            <hr />
            <h2>Scheduled Tasks:</h2>
            {tasks.map(this.renderScheduledTask)}
        </div>
      )
  };
}

export default App;
