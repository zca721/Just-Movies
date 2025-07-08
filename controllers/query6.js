const db = require('../dbConfig');

// Function to register a new user
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }

    // Start transaction
    db.beginTransaction((err) => {
        if (err) {
            console.error('Transaction start error:', err);
            return res.status(500).json({ success: false, message: 'Database transaction error' });
        }

        // First, check if username or email already exists
        const checkUserQuery = 'SELECT Username, Email FROM USERS WHERE Username = ? OR Email = ?';
        db.query(checkUserQuery, [username, email], (error, results) => {
            if (error) {
                return db.rollback(() => {
                    console.error('Check user error:', error);
                    res.status(500).json({ success: false, message: 'Database error during user check' });
                });
            }

            // Check if user already exists
            if (results.length > 0) {
                return db.rollback(() => {
                    const existingUser = results[0];
                    let message = 'User already exists';
                    if (existingUser.Username === username) {
                        message = 'Username already exists';
                    } else if (existingUser.Email === email) {
                        message = 'Email already exists';
                    }
                    res.status(409).json({ success: false, message: message });
                });
            }

            // Insert new user
            const insertUserQuery = 'INSERT INTO USERS (Username, Email, Password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, email, password], (error, results) => {
                if (error) {
                    return db.rollback(() => {
                        console.error('Insert user error:', error);
                        res.status(500).json({ success: false, message: 'Failed to create user account' });
                    });
                }

                // Commit the transaction
                db.commit((commitErr) => {
                    if (commitErr) {
                        return db.rollback(() => {
                            console.error('Commit error:', commitErr);
                            res.status(500).json({ success: false, message: 'Failed to complete registration' });
                        });
                    }

                    // Success response
                    console.log('User registered successfully:', username);
                    res.status(201).json({
                        success: true, message: 'User registered successfully',
                        data: { username: username, email: email }
                    });
                });
            });
        });
    });
};

// Export the function
module.exports = { registerUser };