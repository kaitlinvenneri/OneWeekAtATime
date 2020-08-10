import React, { Component } from 'react';
import Weekday from './Weekday';
import PreviousWeek from './../svgs/PreviousWeek';
import NextWeek from '../svgs/NextWeek';
import CurrentWeek from './../svgs/CurrentWeek';
import SelectWeek from './../svgs/SelectWeek';
import GoToWeek from './GoToWeek';

//Weekview Component within the Planner Page
class WeekView extends Component {
  state = { selectingWeek: false };

  handleGoToWeekButton = () => {
    this.setState({ selectingWeek: true });
  };

  handleCancelGoToWeek = () => {
    this.setState({ selectingWeek: false });
  };

  onGoToWeekSubmit = (date) => {
    const { onGoToDate } = this.props;

    this.setState({ selectingWeek: false });

    onGoToDate(date);
  };

  render() {
    const {
      weekScheduled,
      onDelete,
      onPreviousWeekClick,
      onNextWeekClick,
      onGoToTodayClick,
      onAddToWeekday,
    } = this.props;

    let firstDay;
    let lastDay;

    if (weekScheduled.length > 0) {
      firstDay = weekScheduled[0].dateString;
      lastDay = weekScheduled[6].dateString;
    }

    return (
      <>
        <div className="d-flex flex-row justify-content-center align-items-center my-2">
          <CurrentWeek onClick={onGoToTodayClick} />

          <PreviousWeek onClick={onPreviousWeekClick} />

          <h3 className="mx-2 mt-2">
            {firstDay} - {lastDay}
          </h3>

          <NextWeek onClick={onNextWeekClick} />

          <SelectWeek onClick={this.handleGoToWeekButton} />

          {this.state.selectingWeek && (
            <GoToWeek
              onDateSelection={this.onGoToWeekSubmit}
              onCancelGoToWeek={this.handleCancelGoToWeek}
            />
          )}
        </div>

        <div className="d-flex flex-row">
          {weekScheduled.map((day) => (
            <Weekday
              key={day.date}
              day={day}
              onDelete={onDelete}
              onAddToWeekday={onAddToWeekday}
            />
          ))}
        </div>
      </>
    );
  }
}

export default WeekView;
