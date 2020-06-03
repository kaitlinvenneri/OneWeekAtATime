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
  state = {};
  render() {
    return (
      <FormContainer>
        <AddTaskTitle>Add Task</AddTaskTitle>
        <form>
          <div class="form-row align-items-center">
            <label class="col-auto pl-3" for="taskInput">
              Task Description:
            </label>
            <div class="col-7">
              <input
                type="text"
                class="form-control mb-2"
                id="taskInput"
                placeholder="Write grocery list."
              ></input>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-2">
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
