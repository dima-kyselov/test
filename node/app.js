const express = require('express');
const app = express();
const port = 3000;

const currency = require('./currency');
const db = require('./db');

app.get('/', (req, res) => res.send('test application!'));
app.get('/currency', (req, res) => currency.getCurrency7Days(req, res));
app.get('/users', (req, res) => db.getUsers(req, res));
app.get('/user/:id', (req, res) => db.getUser(req, res));

app.listen(port, () => console.log(`Test app listening on port ${port}!`));