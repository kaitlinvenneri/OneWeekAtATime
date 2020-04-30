import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
        tasks: []
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


    renderTask = ({Taskid, Title}) => <div key={Taskid}>{Title}</div>

  render() {
      const { tasks } = this.state;
      return (
        <div className="App">
            {tasks.map(this.renderTask)}
        </div>
      )
  };
}

export default App;
