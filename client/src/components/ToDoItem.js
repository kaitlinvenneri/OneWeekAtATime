import React, { Component } from "react";
import TodoChecked from "./../svgs/TodoChecked";
import TodoUnchecked from "./../svgs/TodoUnchecked";
import TodoEdit from "./../svgs/TodoEdit";
import TodoSchedule from "./../svgs/TodoSchedule";
import TodoViewScheduled from "./../svgs/TodoViewScheduled";
import TodoDelete from "../svgs/TodoDelete";

class ToDoItem extends Component {
  state = {};
  render() {
    const { task, onDelete, onChangeCompletion } = this.props;

    let labelStyle = {};

    if (task.completionStatus === 1) {
      labelStyle = { fontSize: "20px", textDecoration: "line-through" };
    } else {
      labelStyle = { fontSize: "20px" };
    }

    return (
      <div className="d-flex flex-row justify-content-between ml-1">
        <div className="d-inline-flex flex-row align-items-center">
          <div>
            {task.completionStatus === 1 ? (
              <TodoChecked onClick={onChangeCompletion} task={task} />
            ) : (
              <TodoUnchecked onClick={onChangeCompletion} task={task} />
            )}
          </div>
          <div className="mt-1" style={labelStyle}>
            {task.title}
          </div>
        </div>
        <div className="d-inline-flex flex-row ml-2 mt-2">
          {task.completionStatus === 1 ? (
            <></>
          ) : (
            <div>
              <TodoEdit />
              <TodoSchedule />
              <TodoViewScheduled />
            </div>
          )}
          <div>
            <TodoDelete onDelete={onDelete} task={task} />
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoItem;
