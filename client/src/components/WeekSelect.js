import React, { Component } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function getWeekDays(weekStart) {
  const days = [];
  for (let i = 1; i < 8; i += 1) {
    days.push(moment(weekStart).add(i, 'days').toDate());
  }
  console.log(days);
  return days;
}

class WeekSelect extends Component {
  state = {
    hoverRange: undefined,
    selectedDays: [],
  };

  handleDayChange = (date) => {
    this.setState({
      selectedDays: getWeekDays(moment(date).startOf('week').toDate()),
    });
  };

  handleDayEnter = (date) => {
    this.setState({
      hoverRange: getWeekDays(moment(date).startOf('week').toDate()),
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };

  handleWeekClick = (weekNumber, days, e) => {
    this.setState({
      selectedDays: days,
    });
  };

  render() {
    const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    return (
      <div className="SelectedWeekExample">
        <DayPicker
          selectedDays={selectedDays}
          showOutsideDays
          modifiers={modifiers}
          onDayClick={this.handleDayChange}
          onDayMouseEnter={this.handleDayEnter}
          onDayMouseLeave={this.handleDayLeave}
          onWeekClick={this.handleWeekClick}
        />

        <Helmet>
          <style>{`
            .SelectedWeekExample .DayPicker-Month {
              border-collapse: separate;
            }
            .SelectedWeekExample .DayPicker-WeekNumber {
              outline: none;
            }
            .SelectedWeekExample .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange {
              background-color: #EFEFEF !important;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange {
              background-color: #fff7ba !important;
              border-top-color: #FFEB3B;
              border-bottom-color: #FFEB3B;
              border-left-color: #fff7ba;
              border-right-color: #fff7ba;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
              background-color: #FFEB3B !important;
              border-left: 1px solid #FFEB3B;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
              background-color: #FFEB3B !important;
              border-right: 1px solid #FFEB3B;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
            .SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
              border-radius: 0 !important;
              color: black !important;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange:hover {
              border-radius: 0 !important;
            }
          `}</style>
        </Helmet>
      </div>
    );
  }
}

export default WeekSelect;
