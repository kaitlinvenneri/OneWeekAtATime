import React, { Component } from "react";
import WeekViewTask from "./WeekViewTask";

class WeekView extends Component {
  state = {};

  getColumns = () => {
    const { weekScheduled, onDelete } = this.props;

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
              <WeekViewTask
                task={task}
                onDelete={onDelete}
                key={task.scheduledId}
              />
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
      <table
        className="table table-bordered table-success mx-auto mb-4"
        style={{ width: "98%" }}
      >
        <thead>
          <tr>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
              Monday {dateStrings[0]}
            </th>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
              Tuesday {dateStrings[1]}
            </th>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
              Wednesday {dateStrings[2]}
            </th>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
              Thursday {dateStrings[3]}
            </th>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
              Friday {dateStrings[4]}
            </th>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
              Saturday {dateStrings[5]}
            </th>
            <th scope="col" className="text-center" style={{ width: "14%" }}>
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
