const db = require('../dbConfig');

// Get list of users for drowndown
const getAllUsers = (req, res) => {
    const sql = 'SELECT Username FROM USERS';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
};

// Get details for user
const getUserDetails = (req, res) => {
    const { Username } = req.query;
    const sql = `
        SELECT 
            u.Username, 
            m.Title
        FROM USERS u
        JOIN FAVORITE_MOVIES fm ON u.Username = fm.Username
        JOIN MOVIES m ON fm.Movie_ID = m.Movie_ID
        WHERE u.Username = ?
  `;
    db.query(sql, [Username], (err, result) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return;
        }
        res.json(result);
    });
};

// Export the functions
module.exports = { getAllUsers, getUserDetails };