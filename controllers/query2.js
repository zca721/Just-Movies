const db = require('../dbConfig');

// Get list of movies for drowndown
const getAllMovies = (req, res) => {
    const sql = 'SELECT Title FROM MOVIES';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching movies:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
};

// Get details for movie
const getMovieDetails = (req, res) => {
    const { Title } = req.query;
    const sql = `
        SELECT 
            m.Title AS Movie, 
            m.Rating, m.Genre, 
            m.Streaming
        FROM MOVIES m
        JOIN RATINGS r ON m.Rating = r.Rating 
        WHERE m.Title = ?;
    `;
    db.query(sql, [Title], (err, result) => {
        if (err) {
            console.error('Error fetching movie details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
};

// Export the functions
module.exports = { getAllMovies, getMovieDetails };