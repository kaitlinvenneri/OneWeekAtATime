import React, { Component } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  border: 1px solid silver;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 10px 10px;
`;

const AddTaskTitle = styled.h3`
  padding-left: 10px;
`;

class AddTaskForm extends Component {
  state = {
    task: {
      title: "",
    },
  };

  render() {
    const { onAdd } = this.props;

    return (
      <FormContainer>
        <AddTaskTitle>Add Task</AddTaskTitle>
        <form>
          <div className="form-row align-items-center">
            <label className="col-auto pl-3" htmlFor="taskInput">
              Task Description:
            </label>
            <div className="col-7">
              <input
                type="text"
                className="form-control mb-2"
                id="taskInput"
                placeholder="Write grocery list."
                value={this.state.task.title}
                onChange={(e) =>
                  this.setState({ task: { title: e.target.value } })
                }
              ></input>
            </div>
            <div className="col-auto">
              <button
                onClick={() => onAdd(this.state.task.title)}
                type="submit"
                className="btn btn-primary mb-2"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </FormContainer>
    );
  }
}

export default AddTaskForm;
