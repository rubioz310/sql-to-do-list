const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRouter');

const PORT = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

app.use('/task', taskRouter);
