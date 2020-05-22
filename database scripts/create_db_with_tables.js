var mysql = require('mysql');

//Setting the default connection variables for the database (assuming grading flag not provided)
let hostname = "localhost";
let username = "root";
let dbPassword = "password";
let dbName = "planningApp";

//Modifying database connection variables if server is being run for grading purposes
const args = process.argv.slice(2)
if(args[0] === 'grading'){
    hostname = "dursley.socs.uoguelph.ca";
    username = "vennerik";
    dbPassword = "0885662";
    dbName = "vennerik";
}

//Creating connection variable for connecting to database
var connection = mysql.createConnection({
    host: hostname,
    user: username,
    password: dbPassword
});

//Connecting to the database and completing each query to create database and tables
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    const CREATE_DATABASE_QUERY = `CREATE DATABASE IF NOT EXISTS ${dbName};`

    connection.query(CREATE_DATABASE_QUERY, function (err) {
        if (err) throw err;
        console.log("Database created");
    });

    const CREATE_TASK_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${dbName}.Task ( Taskid int NOT NULL AUTO_INCREMENT, Title varchar(255) NOT NULL, CompletionStatus int DEFAULT 0, PRIMARY KEY (Taskid));`

    connection.query(CREATE_TASK_TABLE_QUERY, function (err) {
        if (err) throw err;
        console.log("Task Table created");
    });

    CREATE_SCHEDULED_TASK_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${dbName}.ScheduledTask ( Scheduledid int NOT NULL AUTO_INCREMENT, Taskid int NOT NULL, ScheduledDate date DEFAULT null, CompletionStatus int DEFAULT 0, PRIMARY KEY (Scheduledid), FOREIGN KEY (Taskid) REFERENCES ${dbName}.Task(Taskid) ON DELETE CASCADE);`

    connection.query(CREATE_SCHEDULED_TASK_TABLE_QUERY, function (err) {
        if (err) throw err;
        console.log("Scheduled Task Table created");
    });
});