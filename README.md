# Just-Movies
Just Movies application

This project is a movie database web application built with Node.js, Express, and MySQL. It allows users to:
- View a list of movies and their details (title, rating, genre, streaming platform)
- View streaming services and the number of movies they offer
- Browse by genre and user-specific details

Usage:
1. Install dependencies
npm install
2. Start the server
npm start
3. Visit the app
Open http://localhost:5002 in your browser.
4. Explore queries
Navigate to the different query pages using the navigation bar

Transaction:
- Our representation of the transaction is through the input of a new user
- If it is a successful commit the user will see "Registration successful! Welcome <username>!
- If it is an unsuccessful commit a rollback will accure due to issues below
    - Existing username or email address
    - Error when initially inserting user information
    - Error during commit of user information
