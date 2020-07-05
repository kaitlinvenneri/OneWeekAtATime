import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="navbar-brand">Planning App</div>
      </nav>
    );
  }
}

export default NavBar;
