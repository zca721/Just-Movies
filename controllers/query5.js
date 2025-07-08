const db = require('../dbConfig');

// Get details for rank
const getRankDetails = (req, res) => {
    const rankDetails = req.query.rankDetails; // Get rank for query parameter
    const query = `
        SELECT 
            m.Title AS MovieTitle, 
            g.Description AS GenreDescription, 
            r.Description AS RatingDescription, 
            a.Rank AS MovieRank,
            u.Username AS Username
        FROM MOVIES m
        JOIN GENRES g ON m.Genre = g.Genre
        JOIN RATINGS r ON m.Rating = r.Rating
        JOIN RANKINGS a ON m.Movie_ID = a.Movie_ID
        JOIN USERS u ON a.Username = u.Username
        WHERE a.Rank = ?
    `;

    db.query(query, [rankDetails], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching rank details' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No rank details found' });
        }
        res.json(results);
    });
};

// Export the function
module.exports = { getRankDetails };