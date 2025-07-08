// Step 1: Import Required Libraries
const express = require('express');
const app = express();
const db = require('./dbConfig');

// Step 2: Import Controllers
const userController = require('./controllers/query1');
const moviesController = require('./controllers/query2');
const genreController = require('./controllers/query3');
const streamingServiceController = require('./controllers/query4');
const rankController = require('./controllers/query5');
const registrationController = require('./controllers/query6');

// Step 3: Middleware Setup
app.use(express.json());
app.use(express.static('public'));

// Step 4: Define Routes
// Query 1
app.get('/user', userController.getAllUsers);
app.get('/user/details', userController.getUserDetails);

// Query 2
app.get('/movies', moviesController.getAllMovies);
app.get('/movies/details', moviesController.getMovieDetails);

// Query 3
app.get('/genreDetails', genreController.getGenreDetails);

// Query 4
app.get('/streamingServices', streamingServiceController.getAllStreamingServices);
app.get('/streamingServices/details', streamingServiceController.getStreamingServiceDetails);

// Query 5
app.get('/rankDetails', rankController.getRankDetails);

// Query 6
app.post('/register', registrationController.registerUser);

// Step 5: Start the Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});