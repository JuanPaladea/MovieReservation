require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const apiMoviesRouter = require('./routes/apiMovies.router');
const apiSessionRouter = require('./routes/apiSession.router');
const apiReservationsRouter = require('./routes/apiReservations.router');
const apiShowtimesRouter = require('./routes/apiShowtimes.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
		
app.use('/api/movies', apiMoviesRouter)
app.use('/api/session', apiSessionRouter)
app.use('/api/reservations', apiReservationsRouter)
app.use('/api/showtimes', apiShowtimesRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`, 'http://localhost:3000');
}); 