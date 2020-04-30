import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
        tasks: [],
        task: {
            title: 'sample title'
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

    addTask = _ => {
        const { task } = this.state;
        fetch(`http://localhost:4000/task/add?title=${task.title}`)
            .then(this.getTasks)
            .catch(err => console.error(err))
    }

    renderTask = ({Taskid, Title}) => <div key={Taskid}>{Title}</div>

  render() {
      const { tasks, task } = this.state;
      return (
        <div className="App">
            {tasks.map(this.renderTask)}

            <div>
                <input
                    value={task.title}
                    onChange={e => this.setState({task: {...task, title: e.target.value}})}/>
                <button onClick={this.addTask}> Add Task </button>
            </div>
        </div>
      )
  };
}

export default App;
