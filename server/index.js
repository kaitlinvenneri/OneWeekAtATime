    const mysql = require('mysql');
    const express = require('express');
    const cors = require('cors');
    const app = express();

    app.use(cors());

    app.listen(4000, () => {
        console.log("Listening on port 4000");
    })

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "planningApp"
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
        const SELECT_ALL_TASKS_QUERY = `SELECT * FROM task`
        
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

        const INSERT_TASK_QUERY = `INSERT INTO task(title) VALUES('${title}')`

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

        const SCHEDULE_TASK_QUERY = `UPDATE task SET scheduleddate = '${date}' WHERE taskid = '${id}';`

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

        const MARK_TASK_COMPLETE_QUERY = `UPDATE task SET completionstatus = '1' WHERE taskid = '${id}';`

        connection.query(MARK_TASK_COMPLETE_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked task as complete')
            }
        });
    })

    app.get('/task/mark-incomplete', (req, res) => {
        const {id} = req.query;

        const MARK_TASK_INCOMPLETE_QUERY = `UPDATE task SET completionstatus = '0' WHERE taskid = '${id}';`

        connection.query(MARK_TASK_INCOMPLETE_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked task as incomplete')
            }
        });
    })

    app.get('/task/delete', (req, res) => {
        const {id} = req.query;

        const DELETE_TASK_QUERY = `DELETE from task WHERE taskid = '${id}';`

        connection.query(DELETE_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully deleted task')
            }
        });
    })

    app.get('/task/update-title', (req, res) => {
        const {id, title} = req.query;

        const UPDATE_TITLE_TASK_QUERY = `UPDATE task SET title = '${title}' WHERE taskid = '${id}';`

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

        const GET_TASK_QUERY = `SELECT * FROM task WHERE taskid = '${id}';`

        connection.query(GET_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully got task')
            }
        });
    })