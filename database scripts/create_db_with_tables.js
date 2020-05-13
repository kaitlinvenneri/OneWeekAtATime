var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE DATABASE IF NOT EXISTS planningapp", function (err) {
        if (err) throw err;
        console.log("Database created");
    });

    connection.query("CREATE TABLE planningapp.Task ( Taskid int NOT NULL AUTO_INCREMENT, Title varchar(255) NOT NULL, CompletionStatus int DEFAULT 0, PRIMARY KEY (Taskid))", function (err) {
        if (err) throw err;
        console.log("Task Table created");
    });

    connection.query("CREATE TABLE planningapp.ScheduledTask ( Scheduledid int NOT NULL AUTO_INCREMENT, Taskid int, ScheduledDate date DEFAULT null, CompletionStatus int DEFAULT 0, PRIMARY KEY (Scheduledid), FOREIGN KEY (Taskid) REFERENCES planningapp.task(taskid) ON DELETE CASCADE)", function (err) {
        if (err) throw err;
        console.log("Scheduled Task Table created");
    });
});