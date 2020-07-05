import React, { Component } from "react";
import ToDoItem from "./ToDoItem";

class ToDoList extends Component {
  state = {};
  render() {
    return (
      <table className="table w-auto mx-auto">
        <thead>
          <tr>
            <th scope="col">To Do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                className="bi bi-journal-plus"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path d="M4 1h5v1H4a1 1 0 0 0-1 1H2a2 2 0 0 1 2-2zm10 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1zM2 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H2z" />
                <path
                  fillRule="evenodd"
                  d="M13.5 1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V1.5a.5.5 0 0 1 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M13 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
                />
              </svg>
            </td>
          </tr>
          <tr>
            <td>
              <ToDoItem text="Whether it is Snapchat, Twitter, Facebook, Yelp o." />
            </td>
          </tr>
          <tr>
            <td>
              <ToDoItem text="small" />
            </td>
          </tr>
          <tr>
            <td>
              <ToDoItem text="Whether it is Snapchat, Twitter" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ToDoList;
