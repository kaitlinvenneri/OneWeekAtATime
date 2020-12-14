import React, { Component } from 'react';

class DeleteListModal extends Component {
  //Handle deleting the List from the db
  handleDeleteClick = async () => {
    const { category, onDelete } = this.props;

    await onDelete(category.categoryId);
  };

  render() {
    const { category } = this.props;

    return (
      <div
        className="modal fade"
        id={'deleteListModal' + category.categoryId}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                List Deletion Confirmation
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
              <p>
                Are you sure you want to delete your <b>{category.name}</b>{' '}
                list?
              </p>
              <p>
                Please note that this will also <b>delete all tasks</b> on this
                list, including <b>scheduled instances</b> of those tasks in the{' '}
                <b>planner</b>.
              </p>
              <p style={{ color: 'red' }}>
                <b>This cannot be undone.</b>
              </p>
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
                className="btn btn-danger"
                onClick={this.handleDeleteClick}
                type="button"
                data-dismiss="modal"
              >
                Delete List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteListModal;
