import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { active } = this.props;

    return (
      <nav
        className="navbar navbar-expand navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <Link className="navbar-brand" to="/">
          Planning App
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className={active === "Planner" ? "nav-item active" : "nav-item"}>
            <Link className="nav-link" to="/">
              Planner
            </Link>
          </li>
          <li className={active === "To Dos" ? "nav-item active" : "nav-item"}>
            <Link className="nav-link" to="/todos">
              To Dos
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
