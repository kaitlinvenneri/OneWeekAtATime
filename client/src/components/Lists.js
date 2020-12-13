import React, { Component } from 'react';
import ToDoList from './ToDoList';

class Lists extends Component {
  state = { categories: this.props.categories };

  //Update state if given new props from parent component
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.categories !== prevProps.categories ||
      this.props.categories !== prevState.categories
    ) {
      this.setState({ categories: this.props.categories });
    }
  }

  render() {
    return (
      <div>
        {this.state.categories.map((category) => (
          <ToDoList key={category.categoryId} category={category} />
        ))}
      </div>
    );
  }
}

export default Lists;
