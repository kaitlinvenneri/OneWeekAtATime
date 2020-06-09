var mysql = require("mysql");

//Setting the default connection variables for the database (assuming grading flag not provided)
let hostname = "localhost";
let username = "root";
let dbPassword = "password";
let dbName = "planningApp";
let grading = false;

//Modifying database connection variables if server is being run for grading purposes
const args = process.argv.slice(2);
if (args[0] === "grading") {
  hostname = "dursley.socs.uoguelph.ca";
  username = "vennerik";
  dbPassword = "0885662";
  dbName = "vennerik";
  grading = true;
}

//Creating connection variable for connecting to database
var connection = mysql.createConnection({
  host: hostname,
  user: username,
  password: dbPassword,
});

//Connecting to the database and completing each query to drop database and tables
//It should be noted that for grading, the database will not be dropped on the socs server
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const DROP_SCHEDULED_TASK_TABLE_QUERY = `DROP TABLE IF EXISTS ${dbName}.scheduledTask;`;

  connection.query(DROP_SCHEDULED_TASK_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log("Scheduled Task Table Dropped");
  });

  const DROP_TASK_TABLE_QUERY = `DROP TABLE IF EXISTS ${dbName}.task;`;

  connection.query(DROP_TASK_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log("Task Table Dropped");
  });

  if (!grading) {
    const DROP_DATABASE_QUERY = `DROP DATABASE IF EXISTS ${dbName};`;

    connection.query(DROP_DATABASE_QUERY, function (err) {
      if (err) throw err;
      console.log("Planning App Database Dropped");
    });
  }
});
