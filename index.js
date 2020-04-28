    const mysql = require('mysql');
    const express = require('express');
    const cors = require('cors');
    const app = express();

    app.use(cors());

    app.listen(3000, () => {
        console.log("Listening on port 3000");
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

        const INSERT_TASK_QUERY = `UPDATE task SET scheduleddate = '${date}' WHERE taskid = '${id}';`

        connection.query(INSERT_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully scheduled task')
            }
        });
    })

    app.get('/task/mark-complete', (req, res) => {
        const {id} = req.query;

        const INSERT_TASK_QUERY = `UPDATE task SET completionstatus = '1' WHERE taskid = '${id}';`

        connection.query(INSERT_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked task as complete')
            }
        });
    })

    app.get('/task/mark-incomplete', (req, res) => {
        const {id} = req.query;

        const INSERT_TASK_QUERY = `UPDATE task SET completionstatus = '0' WHERE taskid = '${id}';`

        connection.query(INSERT_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully marked task as incomplete')
            }
        });
    })

    app.get('/task/delete', (req, res) => {
        const {id} = req.query;

        const INSERT_TASK_QUERY = `DELETE from task WHERE taskid = '${id}';`

        connection.query(INSERT_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully deleted task')
            }
        });
    })

    app.get('/task/update-title', (req, res) => {
        const {id, title} = req.query;

        const INSERT_TASK_QUERY = `UPDATE task SET title = '${title}' WHERE taskid = '${id}';`

        connection.query(INSERT_TASK_QUERY, (err) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully updated the title of the task')
            }
        });
    })