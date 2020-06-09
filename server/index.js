const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();

//cors needed for React integration since frontend exists on its own server
app.use(cors());

//server reachable at http://localhost:4000
app.listen(4000, () => {
  console.log("Listening on port 4000");
});

//Setting the default connection variables for the database (assuming grading flag not provided)
let hostname = "localhost";
let username = "root";
let dbPassword = "password";
let dbName = "planningApp";

//Function to handle escaping characters prior to attempting to put them into the database
function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
    }
  });
}

//Modifying database connection variables if server is being run for grading purposes
const args = process.argv.slice(2);
if (args[0] === "grading") {
  hostname = "dursley.socs.uoguelph.ca";
  username = "vennerik";
  dbPassword = "0885662";
  dbName = "vennerik";
}

//Creating connection variable for connecting to database
var connection = mysql.createConnection({
  host: hostname,
  user: username,
  password: dbPassword,
  database: dbName,
  dateStrings: true,
});

//Connecting to the database
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to database!");
  }
});

//Endpoint for homepage
app.get("/", (req, res) => {
  res.send("homepage");
});

//Endpoint to view all tasks
app.get("/tasks", (req, res) => {
  const SELECT_ALL_TASKS_QUERY = `SELECT * FROM Task`;

  connection.query(SELECT_ALL_TASKS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(results));
    }
  });
});

//Endpoint to view all scheduled tasks
app.get("/scheduled-tasks", (req, res) => {
  const SELECT_ALL_TASKS_QUERY = `SELECT * FROM ScheduledTask`;

  connection.query(SELECT_ALL_TASKS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(results));
    }
  });
});

//Endpoint to add a task
app.get("/task/add", (req, res) => {
  const { title } = req.query;
  const formattedTitle = mysql_real_escape_string(title);

  const INSERT_TASK_QUERY = `INSERT INTO Task(title) VALUES('${formattedTitle}')`;

  connection.query(INSERT_TASK_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added task");
    }
  });
});

//Endpoint to schedule a task
app.get("/task/schedule", (req, res) => {
  const { id, date } = req.query;

  const SCHEDULE_TASK_QUERY = `INSERT INTO ScheduledTask(taskid,scheduleddate) VALUES('${id}', '${date}')`;

  connection.query(SCHEDULE_TASK_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully scheduled task");
    }
  });
});

//Endpoint to mark a task as complete
app.get("/task/mark-complete", (req, res) => {
  const { id } = req.query;

  const MARK_TASK_COMPLETE_QUERY = `UPDATE Task SET completionstatus = '1' WHERE taskid = '${id}';`;

  connection.query(MARK_TASK_COMPLETE_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully marked task as complete");
    }
  });
});

//Endpoint to mark a scheduled task as complete
app.get("/scheduled-task/mark-complete", (req, res) => {
  const { id } = req.query;

  const MARK_SCHEDULED_COMPLETE_QUERY = `UPDATE ScheduledTask SET completionstatus = '1' WHERE scheduledid = '${id}';`;

  connection.query(MARK_SCHEDULED_COMPLETE_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully marked scheduled task as complete");
    }
  });
});

//Endpoint to mark a task as incomplete
app.get("/task/mark-incomplete", (req, res) => {
  const { id } = req.query;

  const MARK_TASK_INCOMPLETE_QUERY = `UPDATE Task SET completionstatus = '0' WHERE taskid = '${id}';`;

  connection.query(MARK_TASK_INCOMPLETE_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully marked task as incomplete");
    }
  });
});

//Endpoint to mark a scheduled task as incomplete
app.get("/scheduled-task/mark-incomplete", (req, res) => {
  const { id } = req.query;

  const MARK_SCHEDULED_INCOMPLETE_QUERY = `UPDATE ScheduledTask SET completionstatus = '0' WHERE scheduledid = '${id}';`;

  connection.query(MARK_SCHEDULED_INCOMPLETE_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully marked scheduled task as incomplete");
    }
  });
});

//Endpoint to delete a task
app.get("/task/delete", (req, res) => {
  const { id } = req.query;

  const DELETE_TASK_QUERY = `DELETE from Task WHERE taskid = '${id}';`;

  connection.query(DELETE_TASK_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully deleted task");
    }
  });
});

//Endpoint to delete a scheduled task (unschedule a task for the date within the scheduled task)
app.get("/scheduled-task/delete", (req, res) => {
  const { id } = req.query;

  const DELETE_SCHEDULED_TASK_QUERY = `DELETE from ScheduledTask WHERE scheduledid = '${id}';`;

  connection.query(DELETE_SCHEDULED_TASK_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully deleted scheduled task");
    }
  });
});

//Endpoint to update the title of a task
app.get("/task/update-title", (req, res) => {
  const { id, title } = req.query;

  const UPDATE_TITLE_TASK_QUERY = `UPDATE Task SET title = '${title}' WHERE taskid = '${id}';`;

  connection.query(UPDATE_TITLE_TASK_QUERY, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully updated the title of the task");
    }
  });
});

//Endpoint to get a task by id and view attributes in JSON format
app.get("/task/get-task", (req, res) => {
  const { id } = req.query;

  const GET_TASK_QUERY = `SELECT * FROM Task WHERE taskid = '${id}';`;

  connection.query(GET_TASK_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(results));
    }
  });
});
