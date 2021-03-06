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

//Connecting to the database and completing each query to drop tables
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  const DROP_SCHEDULED_TASK_TABLE_QUERY = `DROP TABLE IF EXISTS ${dbName}.scheduledTask;`;

  connection.query(DROP_SCHEDULED_TASK_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log('Scheduled Task Table Dropped');
  });

  const DROP_TASK_TABLE_QUERY = `DROP TABLE IF EXISTS ${dbName}.task;`;

  connection.query(DROP_TASK_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log('Task Table Dropped');
  });

  const DROP_CATEGORY_TABLE_QUERY = `DROP TABLE IF EXISTS ${dbName}.category;`;

  connection.query(DROP_CATEGORY_TABLE_QUERY, function (err) {
    if (err) throw err;
    console.log('Category Table Dropped');
  });

  connection.end();
});

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`);
});
