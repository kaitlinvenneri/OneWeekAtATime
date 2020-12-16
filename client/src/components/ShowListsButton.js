import React, { Component } from 'react';
import OpenEye from './../svgs/OpenEye';
import ClosedEye from './../svgs/ClosedEye';

class ShowListsButton extends Component {
  render() {
    const { listsShowing, onClick } = this.props;

    return (
      <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={onClick}
      >
        {listsShowing ? (
          <>
            <ClosedEye />
            Hide Task Lists
          </>
        ) : (
          <>
            <OpenEye />
            Show Task Lists
          </>
        )}
      </button>
    );
  }
}

export default ShowListsButton;
