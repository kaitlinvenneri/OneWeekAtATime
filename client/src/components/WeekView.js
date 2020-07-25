import React, { Component } from 'react';
import Weekday from './Weekday';
import PreviousWeek from './../svgs/PreviousWeek';
import NextWeek from '../svgs/NextWeek';
import CurrentWeek from './../svgs/CurrentWeek';
import SelectWeek from './../svgs/SelectWeek';
import WeekSelect from './WeekSelect';

class WeekView extends Component {
  state = {};
  render() {
    const {
      weekScheduled,
      onDelete,
      onPreviousWeekClick,
      onNextWeekClick,
      onGoToTodayClick,
    } = this.props;

    let firstDay;
    let lastDay;

    if (weekScheduled.length > 0) {
      firstDay = weekScheduled[0].dateString;
      lastDay = weekScheduled[6].dateString;
    }

    return (
      <>
        <div className="d-flex flex-row justify-content-center mt-2">
          <CurrentWeek onClick={onGoToTodayClick} />

          <SelectWeek />

          <WeekSelect />

          <PreviousWeek onClick={onPreviousWeekClick} />

          <h3 className="mx-2">
            {firstDay} - {lastDay}
          </h3>

          <NextWeek onClick={onNextWeekClick} />
        </div>
        <div className="d-flex flex-row">
          {weekScheduled.map((day) => (
            <Weekday key={day.date} day={day} onDelete={onDelete} />
          ))}
        </div>
      </>
    );
  }
}

export default WeekView;
