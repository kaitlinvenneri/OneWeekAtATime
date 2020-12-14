import React, { Component } from 'react';
class AddListModal extends Component {
  state = {
    name: '',
    color: 'gray',
  };

  //Handle adding the List to the db
  handleAddClick = async () => {
    const { onAdd } = this.props;

    await onAdd(this.state.name, this.state.color).then(() => {
      //Clear the name previously entered
      this.setState({ name: '' });
    });
  };

  handleRadioButtonChange = () => {};

  // //Handle adding the List if user hits the enter key
  // handleKeyDown = (e) => {
  //   //Prevent list from being added if no name has been entered
  //   if (e.key === 'Enter' && this.state.name.length > 0) {
  //     this.handleAddClick();
  //   }
  // };

  render() {
    return (
      <div
        className="modal fade"
        id="addListModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New List
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <b>List name</b>
              <input
                type="text"
                className="form-control mt-1 mb-3"
                id="newListNameInput"
                placeholder="To Do List"
                value={this.state.name}
                size="20"
                maxLength="20"
                onChange={(e) => this.setState({ name: e.target.value })}
                onKeyDown={this.handleKeyDown}
              />

              <div>
                <b>List Color</b>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="grayRadioButton"
                  value="gray"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="grayRadioButton">
                  Gray
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="blueRadioButton"
                  value="blue"
                />
                <label className="form-check-label" htmlFor="blueRadioButton">
                  Blue
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="pinkRadioButton"
                  value="pink"
                />
                <label className="form-check-label" htmlFor="pinkRadioButton">
                  Pink
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="greenRadioButton"
                  value="green"
                />
                <label className="form-check-label" htmlFor="greenRadioButton">
                  Green
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="orangeRadioButton"
                  value="orange"
                />
                <label className="form-check-label" htmlFor="orangeRadioButton">
                  Orange
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={this.handleAddClick}
                type="button"
                disabled={this.state.name.length === 0}
                data-dismiss="modal"
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddListModal;
