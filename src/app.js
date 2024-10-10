require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const pool = require('./db');

const app = express();

app.use('/', (req, res) => {
	res.send('Hello World');
});

app.get('/users', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM users');
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`, 'http://localhost:3000');
}); 