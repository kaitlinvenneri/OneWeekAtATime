import React, { Component } from "react";
import ToDoItem from "./ToDoItem";

class ToDoList extends Component {
  state = {};
  render() {
    return (
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">To Do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ToDoItem
                text="Whether it is Snapchat, Twitter, Facebook, Yelp or just a note to
          co-workers or business officials, the number of actual characters
          matters. What you say may not be as important as how you say it. And
          how many characters you use. asdl sadjkls adjiop sasa."
              />
            </td>
          </tr>
          <tr>
            <td>
              <ToDoItem text="small" />
            </td>
          </tr>
          <tr>
            <td>
              <ToDoItem
                text="Whether it is Snapchat, Twitter, Facebook, Yelp or just a note to
          co-workers or business officials, the number of actual characters
          matters."
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ToDoList;
