const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {getEnum} = require("../utils/common");

router.post('/api/signin', (req, res) => {
    const users = getEnum('USERS');
    const { username } = req.body;

    // find user with the matching username
    const user = users.find(u => u.username === username);
    if (user) {
        // return the user ID to the client
        res.json(user);
    } else {
        // return 401 unauthorized status code
        res.status(401).json({ message: 'Invalid username' });
    }
});

module.exports = router;