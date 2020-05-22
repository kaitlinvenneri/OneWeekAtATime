    const mysql = require('mysql');
    const express = require('express');
    const cors = require('cors');
    const app = express();

    app.use(cors());

    app.listen(4000, () => {
        console.log("Listening on port 4000");
    })

    let hostname = "localhost";
    let username = "root";
    let dbPassword = "password";
    let dbName = "planningApp";

    const args = process.argv.slice(2)
    if(args[0] === 'grading'){
        hostname = "dursley.socs.uoguelph.ca";
        username = "vennerik";
        dbPassword = "0885662";
        dbName = "vennerik";
    }

    var connection = mysql.createConnection({
        host: hostname,
        user: username,
        password: dbPassword,
        database: dbName
    });

    connection.connect(err => {
        if (err) {
            throw err;
        } else {
            console.log("Connected to database!");
        }
    })

    app.get('/', (req, res) => {
        res.send('homepage')
    })

    app.get('/tasks', (req, res) => {
        const SELECT_ALL_TASKS_QUERY = `SELECT * FROM Task`
        
        connection.query(SELECT_ALL_TASKS_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            } else {
                return res.json({
                    data: results
                })
            }
        });
    })

    app.get('/scheduled-tasks', (req, res) => {
        const SELECT_ALL_TASKS_QUERY = `SELECT * FROM ScheduledTask`

        connection.query(SELECT_ALL_TASKS_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            } else {
                return res.json({
                    data: results
                })
            }
        });
    })

    app.get('/task/add', (req, res) => {
        const {title} = req.query;

        const INSERT_TASK_QUERY = `INSERT INTO Task(title) VALUES('${title}')`

        connection.query(INSERT_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully added task')
            }
        });
    })

    app.get('/task/schedule', (req, res) => {
        const {id, date} = req.query;

        const SCHEDULE_TASK_QUERY = `INSERT INTO ScheduledTask(taskid,scheduleddate) VALUES('${id}', '${date}')`

        connection.query(SCHEDULE_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully scheduled task')
            }
        });
    })

    app.get('/task/mark-complete', (req, res) => {
        const {id} = req.query;

        const MARK_TASK_COMPLETE_QUERY = `UPDATE Task SET completionstatus = '1' WHERE taskid = '${id}';`

        connection.query(MARK_TASK_COMPLETE_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked task as complete')
            }
        });
    })

    app.get('/scheduled-task/mark-complete', (req, res) => {
        const {id} = req.query;

        const MARK_SCHEDULED_COMPLETE_QUERY = `UPDATE ScheduledTask SET completionstatus = '1' WHERE scheduledid = '${id}';`

        connection.query(MARK_SCHEDULED_COMPLETE_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked scheduled task as complete')
            }
        });
    })

    app.get('/task/mark-incomplete', (req, res) => {
        const {id} = req.query;

        const MARK_TASK_INCOMPLETE_QUERY = `UPDATE Task SET completionstatus = '0' WHERE taskid = '${id}';`

        connection.query(MARK_TASK_INCOMPLETE_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked task as incomplete')
            }
        });
    })

    app.get('/scheduled-task/mark-incomplete', (req, res) => {
        const {id} = req.query;

        const MARK_SCHEDULED_INCOMPLETE_QUERY = `UPDATE ScheduledTask SET completionstatus = '0' WHERE scheduledid = '${id}';`

        connection.query(MARK_SCHEDULED_INCOMPLETE_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked scheduled task as incomplete')
            }
        });
    })

    app.get('/task/delete', (req, res) => {
        const {id} = req.query;

        const DELETE_TASK_QUERY = `DELETE from Task WHERE taskid = '${id}';`

        connection.query(DELETE_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully deleted task')
            }
        });
    })

    app.get('/scheduled-task/delete', (req, res) => {
        const {id} = req.query;

        const DELETE_SCHEDULED_TASK_QUERY = `DELETE from ScheduledTask WHERE scheduledid = '${id}';`

        connection.query(DELETE_SCHEDULED_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully deleted scheduled task')
            }
        });
    })

    app.get('/task/update-title', (req, res) => {
        const {id, title} = req.query;

        const UPDATE_TITLE_TASK_QUERY = `UPDATE Task SET title = '${title}' WHERE taskid = '${id}';`

        connection.query(UPDATE_TITLE_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully updated the title of the task')
            }
        });
    })

    app.get('/task/get-task', (req, res) => {
        const {id} = req.query;

        const GET_TASK_QUERY = `SELECT * FROM Task WHERE taskid = '${id}';`

        connection.query(GET_TASK_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            } else {
                return res.json(results)
            }
        });
    })