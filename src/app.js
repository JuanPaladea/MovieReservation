require('dotenv').config();
const express = require('express');
const session = require('express-session');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path')
const cors = require('cors');

const apiMoviesRouter = require('./routes/apiMovies.router');
const apiSessionRouter = require('./routes/apiSession.router');
const apiReservationsRouter = require('./routes/apiReservations.router');
const apiShowtimesRouter = require('./routes/apiShowtimes.router');
const apiSeatsRouter = require('./routes/apiSeats.router');
const apiHallsRouter = require('./routes/apiHalls.router');
const apiPaymentsRouter = require('./routes/apiPayments.router');
const limiter = require('./utils/limiter');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MovieReservation API",
      version: "1.0.0",
      description: "Movie Reservation API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, './docs/**/*.yaml')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/movies', apiMoviesRouter)
app.use('/api/session', apiSessionRouter)
app.use('/api/reservations', apiReservationsRouter)
app.use('/api/showtimes', apiShowtimesRouter)
app.use('/api/seats', apiSeatsRouter)
app.use('/api/halls', apiHallsRouter)
app.use('/api/payments', apiPaymentsRouter)

app.use('/', (req, res) => {
  res.redirect('/api-docs');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`, `http://localhost:${PORT}`);
}); 