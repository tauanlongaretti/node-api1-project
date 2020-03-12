// implement your API here
const db = require('./data/db.js');

const express = require('express');

const server = express();

server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===');
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world...');
})

// POST
server.post('/api/user', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then((user) => {
            res.status(201).json({ success: true, user });
        })
        .catch((err) => {
            res.status(500).json({ success: false, err});
        });
});

// GET
server.get('/api/user', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        });
});

// GET BY ID


// DELETE


// PUT


