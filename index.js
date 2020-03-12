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
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then((user) => {
            if (userInfo) {
                res.status(201).json({ success: true, user });
            } else {
                res.status(400).json({ success: false, errorMessage: "Please provide name and bio for the user." })
            }
        })
        .catch(() => {
            res.status(500).json({ success: false, errorMessage: "There was an error while saving the user to the database"});
        });
});

// GET
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ success: false, errorMessage: "The users information could not be retrieved." })
        });
});

// GET BY ID
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const userInfo = req.body;

    db.update(id, userInfo)
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json({ success: true, updatedUser});
            } else {
                res.status(404).json({ success: false, message: "The user with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ success: false, errorMessage: "The user information could not be retrieved." })
        })
})

// DELETE
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.status(204).end();
            } else {
                res.status(404).json({ success: false, message: "The user with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ success: false, errorMessage: "The user could not be removed" })
        })
})

// PUT


