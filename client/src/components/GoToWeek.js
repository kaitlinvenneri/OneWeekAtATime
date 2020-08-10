import React, { Component } from 'react';

//Component for choosing a week to go to in the WeekView of the PlannerPage
class GoToWeek extends Component {
  state = {
    date: '',
  };

  componentDidMount() {
    //Default the date to go to to the current date
    let currDay = new Date();
    currDay.setUTCDate(currDay.getDate());
    let ISOstring = currDay.toISOString();
    ISOstring = ISOstring.substr(0, 10);

    this.setState({ date: ISOstring });
  }

  render() {
    const { onCancelGoToWeek, onDateSelection } = this.props;

    return (
      <div className="d-flex">
        <input
          type="date"
          value={this.state.date}
          onChange={(e) => onDateSelection(e.target.value)}
        />
        <button
          onClick={onCancelGoToWeek}
          type="submit"
          className="btn btn-outline-danger btn-sm ml-2"
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default GoToWeek;
