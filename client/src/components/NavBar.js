import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <a className="navbar-brand" href="#">
          Planning App
        </a>
      </nav>
    );
  }
}

export default NavBar;
