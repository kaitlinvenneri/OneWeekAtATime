import React, { Component } from "react";

class WeekView extends Component {
  state = {};

  getColumns = () => {
    const { weekScheduled } = this.props;

    let columns = [];

    let i;
    for (i = 0; i < weekScheduled.length; i++) {
      let day = weekScheduled[i];

      if (day.scheduledTasks.length === 0) {
        columns.push(<td key={i}></td>);
      } else {
        columns.push(
          <td key={i}>
            {day.scheduledTasks.map((task) => (
              <div
                className="border rounded mb-3 pt-3 pl-3 pr-3"
                key={task.scheduledId}
              >
                <div className="form-group form-check d-flex">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={task.scheduledId}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={task.scheduledId}
                  >
                    {task.title}
                  </label>
                  <button className="btn btn-sm btn-danger py-0 ml-1">x</button>
                </div>
              </div>
            ))}
          </td>
        );
      }
    }

    return columns;
  };

  render() {
    const { weekScheduled } = this.props;

    let dates = [];
    let i;

    for (i = 0; i < weekScheduled.length; i++) {
      dates.push(weekScheduled[i].date);
    }

    let dateStrings = [];

    for (i = 0; i < dates.length; i++) {
      let dateComps = dates[i].split("-");
      let year = dateComps[0];
      let month = dateComps[1];
      let day = dateComps[2];

      let monthString;

      switch (month) {
        case "01":
          monthString = "January";
          break;
        case "02":
          monthString = "February";
          break;
        case "03":
          monthString = "March";
          break;
        case "04":
          monthString = "April";
          break;
        case "05":
          monthString = "May";
          break;
        case "06":
          monthString = "June";
          break;
        case "07":
          monthString = "July";
          break;
        case "08":
          monthString = "August";
          break;
        case "09":
          monthString = "September";
          break;
        case "10":
          monthString = "October";
          break;
        case "11":
          monthString = "November";
          break;
        case "12":
          monthString = "December";
          break;
        default:
          monthString = "oops";
      }

      let dateString = monthString + " " + day + ", " + year;
      dateStrings.push(dateString);
    }

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Monday {dateStrings[0]}
            </th>
            <th scope="col" className="text-center">
              Tuesday {dateStrings[1]}
            </th>
            <th scope="col" className="text-center">
              Wednesday {dateStrings[2]}
            </th>
            <th scope="col" className="text-center">
              Thursday {dateStrings[3]}
            </th>
            <th scope="col" className="text-center">
              Friday {dateStrings[4]}
            </th>
            <th scope="col" className="text-center">
              Saturday {dateStrings[5]}
            </th>
            <th scope="col" className="text-center">
              Sunday {dateStrings[6]}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>{this.getColumns()}</tr>
        </tbody>
      </table>
    );
  }
}

export default WeekView;
