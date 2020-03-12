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
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
        });
});

// GET
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        });
});

// GET BY ID
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json({ success: true, user })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
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
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user could not be removed" })
        })
})

// PUT
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const userInfo = req.body;

    db.update(id, userInfo)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else if (!userInfo.name || !userInfo.bio) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            } else {
                res.status(200).json({ success: true, user: id })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })
})


