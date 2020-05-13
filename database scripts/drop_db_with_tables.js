var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("DROP TABLE IF EXISTS planningapp.ScheduledTask", function (err) {
        if (err) throw err;
        console.log("Scheduled Task Table Dropped");
    });

    connection.query("DROP TABLE IF EXISTS planningapp.Task", function (err) {
        if (err) throw err;
        console.log("Task Table Dropped");
    });

    connection.query("DROP DATABASE planningapp", function (err) {
        if (err) throw err;
        console.log("Planning App Database Dropped");
    });
});