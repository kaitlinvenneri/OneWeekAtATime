var mysql = require('mysql');

//Setting the default connection variables for the database (assuming grading flag not provided)
let hostname = 'localhost';
let username = 'root';
let dbPassword = 'password';
let dbName = 'oneWeekAtATime';

//Modifying database connection variables if server is being run for grading purposes
const args = process.argv.slice(2);
if (args[0] === 'grading') {
  hostname = 'dursley.socs.uoguelph.ca';
  username = 'vennerik';
  dbPassword = '0885662';
  dbName = 'vennerik';
}

//Creating connection variable for connecting to database
var connection = mysql.createConnection({
  host: hostname,
  user: username,
  password: dbPassword,
});

//Connecting to the database and completing each query to create database and tables
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  const CREATE_DATABASE_QUERY = `CREATE DATABASE IF NOT EXISTS ${dbName};`;

  connection.query(CREATE_DATABASE_QUERY, function (err) {
    if (err) throw err;
    console.log('Database created');
  });

  const CREATE_CATEGORY_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${dbName}.category ( categoryId int NOT NULL AUTO_INCREMENT, name varchar(20) NOT NULL UNIQUE, PRIMARY KEY (categoryId));`;

  connection.query(CREATE_CATEGORY_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log('Category Table created');
  });

  const CREATE_TASK_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${dbName}.task ( taskId int NOT NULL AUTO_INCREMENT, title varchar(50) NOT NULL, completionStatus int DEFAULT 0, categoryId int NOT NULL, PRIMARY KEY (taskId), FOREIGN KEY (categoryId) REFERENCES ${dbName}.category(categoryId) ON DELETE CASCADE);`;

  connection.query(CREATE_TASK_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log('Task Table created');
  });

  CREATE_SCHEDULED_TASK_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${dbName}.scheduledTask ( scheduledId int NOT NULL AUTO_INCREMENT, taskId int NOT NULL, scheduledDate date DEFAULT null, completionStatus int DEFAULT 0, PRIMARY KEY (scheduledId), FOREIGN KEY (taskId) REFERENCES ${dbName}.task(taskId) ON DELETE CASCADE);`;
  connection.query(CREATE_SCHEDULED_TASK_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log('Scheduled Task Table created');
  });

  connection.end();
});

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`);
});
