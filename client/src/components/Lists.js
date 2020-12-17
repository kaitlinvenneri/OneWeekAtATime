import React, { Component } from 'react';
import ToDoList from './ToDoList';
import AddListButton from './AddListButton';

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
    const { onDeleteList, updateWeekview } = this.props;

    return (
      <div className="d-flex flex-column mt-3 px-3 border rounded-lg shadow mx-1">
        <h3 className="d-inline-flex justify-content-center pb-2 mt-2 border-bottom">
          Your Task Lists
        </h3>
        <div className="d-inline-flex justify-content-center pb-2 mt-2">
          <AddListButton />
        </div>
        <div className="d-flex flex-row flex-wrap mt-2 align-items-start justify-content-center">
          {this.state.categories.map((category) => (
            <ToDoList
              key={category.categoryId}
              category={category}
              onDelete={onDeleteList}
              updateWeekview={updateWeekview}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Lists;
