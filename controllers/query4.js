const db = require('../dbConfig');

// Get list of streaming service for drowndown
const getAllStreamingServices = (req, res) => {
    const sql = 'SELECT Streaming FROM STREAMING_SERVICE';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching streaming services:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
};

// Get details for streaming services
const getStreamingServiceDetails = (req, res) => {
    const { Streaming } = req.query;
    const sql = `
        SELECT 
            S.Company, 
            S.Streaming, 
            COALESCE(COUNT(M.Movie_ID), 0) AS NumberOfMovies
        FROM STREAMING_SERVICE S
        LEFT JOIN MOVIES M ON M.Streaming = S.Streaming
        WHERE S.Streaming = ?
        GROUP BY S.Company, S.Streaming;
    `;
    db.query(sql, [Streaming], (err, result) => {
        if (err) {
            console.error('Error fetching streaming services details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
};

// Export the functions
module.exports = { getAllStreamingServices, getStreamingServiceDetails };