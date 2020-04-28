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

    app.get('/tasks/add', (req, res) => {
        const {title} = req.query;
        console.log(title);

        const INSERT_TASK_QUERY = `INSERT INTO task(title) VALUES('${title}')`

        connection.query(INSERT_TASK_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('successfully added task')
            }
        });
    })