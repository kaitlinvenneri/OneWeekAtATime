import React, { Component } from "react";
import NavBar from "./../components/NavBar";
import ToDoList from "./../components/ToDoList";

class ToDoPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar active="To Do List" />
        <ToDoList />
      </div>
    );
  }
}

export default ToDoPage;
