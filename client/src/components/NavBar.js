import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Component to navigate between pages
//Active link is highlighted when on the page associated with the link in the Nav Bar
class NavBar extends Component {
  render() {
    const { active } = this.props;

    return (
      <nav
        className="navbar navbar-expand navbar-light"
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <Link className="navbar-brand" to="/">
          Planning App
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className={active === 'Planner' ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/">
              Planner
            </Link>
          </li>
          <li
            className={active === 'To Do List' ? 'nav-item active' : 'nav-item'}
          >
            <Link className="nav-link" to="/todo-list">
              To Do List
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
