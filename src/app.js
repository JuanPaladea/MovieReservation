const express = require('express');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000', 'http://localhost:3000');
}); 