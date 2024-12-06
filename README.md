# MovieReservationBack

Backend application that uses Node.js, Express, and Vercel's PostgreSQL Database. The application provides a platform for managing movies, seats, showtimes and reservations. It also includes user authentication and authorization.

---

## Features

<!-- User registration and authentication
View available movies and showtimes
Make, view, and cancel reservations
Integration with PostgreSQL for data persistence
RESTful API built with Express.js and TypeScript -->

- **User Registration and Authentication**: Secure user accounts with registration and login functionality.
- **Movie Management**: Add, update, and delete movies with details like title, genre, and showtimes.
- **Seat Management**: Manage available seats for each showtime.
- **Reservation System**: Book tickets for a selected movie and showtime.
- **Data Persistence**: Integration with PostgreSQL for storing movie, seat, and reservation data.
- **RESTful API**: Built with Express.js and TypeScript for efficient data retrieval and manipulation.
- **User Authorization**: Role-based access control for managing user permissions.
- **API Documentation**: Detailed documentation for all available endpoints.
- **Unit Testing**: Automated tests for API endpoints to ensure reliability.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **PostgreSQL**: Open-source relational database for data storage.
- **Vercel**: Cloud platform for hosting PostgreSQL databases.
- **JWT**: JSON Web Tokens for user authentication and authorization.
- **Jest**: Testing framework for unit testing API endpoints.

---

## Live Demo

The application is hosted on Render and can be accessed at [MovieReservationBack](https://moviereservation.onrender.com/).

---

## Folder Structure

```plaintext
MovieReservationBack/
├── src/
│   ├── controllers/    # Controller functions for handling requests
│   ├── docs/           # API documentation
│   ├── middlewares/    # Middleware functions for request processing
│   ├── routes/         # Route definitions for API endpoints
│   ├── services/       # Business logic for handling data
│   ├── test/           # Unit tests for API endpoints
│   ├── App.js          # Main application file
│   ├── db.js           # Database connection setup
```

## Frontend Integration

This back-end application communicates with a frontend developed to manage movie data and reservations. Can be found at [MovieReservationFront](https://github.com/JuanPaladea/MovieReservationFront).