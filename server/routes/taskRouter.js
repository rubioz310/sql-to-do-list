const pool = require('../modules/pool');
const express = require('express');

const router = express.Router();


router.get('/', (req, res) =>{
    let queryText = 'SELECT * FROM "ToDoList";';

    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) =>{
    let newTask = req.body;
    let queryText = `INSERT INTO "ToDoList" ("task", "isComplete")
            VALUES ($1, $2);`;

    pool.query(queryText, [newTask.task, newTask.isComplete])
    .then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
});

module.exports = router;