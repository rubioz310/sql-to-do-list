const pool = require('../modules/pool');
const express = require('express');

const router = express.Router();


router.get('/', (req, res) =>{
    let order = req.query.order;
    let queryText = `SELECT * FROM "ToDoList" ORDER BY "isComplete" ${order}, "id" ASC;`;

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

router.put('/:id', (req, res) =>{
    let id = req.params.id;
    let completionDate = new Date();
    let queryText = `UPDATE "ToDoList" 
                    SET "isComplete" = true, "completeDate" = $1
                    WHERE "id" = $2`;

    pool.query(queryText, [completionDate, id])
    .then(result => {
        res.sendStatus(202);
    }).catch(err => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) =>{
    let id = req.params.id;
    let queryText = `DELETE FROM "ToDoList"
                    WHERE "id" = $1`;

    pool.query(queryText, [id])
    .then(result => {
        res.sendStatus(202);
    }).catch(err => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
});

module.exports = router;