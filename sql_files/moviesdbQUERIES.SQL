-- Part C
-- **************************
-- SQL Query 1: Join at least three tables using JOIN ON
-- Purpose: Find each user’s favorite movie
SELECT u.Username, m.Title
FROM USERS u
JOIN FAVORITE_MOVIES fm ON u.Username = fm.Username
JOIN MOVIES m ON fm.Movie_ID = m.Movie_ID;
WHERE u.Username =  ?;

-- SQL Query 2: Use nested queries with IN, ANY, or ALL and include a GROUP BY clause
-- Purpose: List all genres that appear in movies which are rated above the average minimum age rating
SELECT m.Genre, COUNT(*) AS Movie_Count
FROM MOVIES m
WHERE m.Rating IN (
    SELECT Rating
    FROM RATINGS
    WHERE Minimum_Age > (
        SELECT AVG(Minimum_Age) FROM RATINGS
    )
)
GROUP BY m.Genre;

-- SQL Query 3: A correlated subquery with aliasing
-- Purpose: For each movie, show its title and whether its length is above the average for its genre.
SELECT
    M1.Title,
    M1.Minutes,
    (SELECT AVG(M2.Minutes) FROM MOVIES M2 WHERE M2.Genre = M1.Genre) AS GenreAvg,
    CASE
        WHEN M1.Minutes > (SELECT AVG(M2.Minutes) FROM MOVIES M2 WHERE M2.Genre = M1.Genre) 
        THEN 'Above Avg'
        ELSE 'Below Avg'
    END AS Comparison
FROM MOVIES M1;

-- SQL Query 4: Use a FULL OUTER JOIN
-- Purpose: List all users and all movies, showing favorite status if present.
SELECT
    U.Username,
    M.Title,
    FM.Movie_ID AS Favorite_Movie_ID
FROM USERS U
LEFT OUTER JOIN FAVORITE_MOVIES FM ON U.Username = FM.Username
LEFT OUTER JOIN MOVIES M ON FM.Movie_ID = M.Movie_ID

UNION

SELECT
    U.Username,
    M.Title,
    FM.Movie_ID AS Favorite_Movie_ID
FROM USERS U
RIGHT OUTER JOIN FAVORITE_MOVIES FM ON U.Username = FM.Username
RIGHT OUTER JOIN MOVIES M ON FM.Movie_ID = M.Movie_ID

ORDER BY Username, Title;

-- SQL Query 5: Use a set operation: UNION, EXCEPT, or INTERSECT
-- Purpose: List genres that are in GENRES but not in MOVIES
SELECT Genre
FROM GENRES
MINUS
SELECT DISTINCT Genre
FROM MOVIES;

-- SQL Query 6: Custom non-trivial query (JOIN)
-- Purpose: List selected movie along with rating, genre, and streaming info.
SELECT 
    m.Title AS Movie, 
    m.Rating, 
    m.Genre, 
    m.Streaming
FROM MOVIES m
JOIN RATINGS r ON m.Rating = r.Rating 
WHERE m.Title = ?;


-- SQL Query 7: Your own non-trivial queries using at least two tables
-- Purpose: Find all streaming services and show number of movies.
    SELECT 
        S.Company, 
        S.Streaming, 
        COALESCE(COUNT(M.Movie_ID), 0) AS NumberOfMovies
      FROM STREAMING_SERVICE S
      LEFT JOIN MOVIES M ON M.Streaming = S.Streaming
      WHERE S.Streaming = ?
      GROUP BY S.Company, S.Streaming;
    

-- SQL Query 8: A non-trivial queries using at least two tables
-- Purpose: Display all movies available to a user based on their age.
SELECT
    m.Title AS MovieTitle,
    m.Genre AS MovieGenre,
    r.Rating AS AgeRating,
    r.Minimum_Age AS MinimumAge,
    s.Streaming AS StreamingService
FROM MOVIES m
JOIN RATINGS r ON m.Rating = r.Rating
JOIN STREAMING_SERVICE s ON m.Streaming = s.Streaming
WHERE r.Minimum_Age <= ?;

-- SQL Query 9: A non-trivial query using at least three tables 
-- Purpose: List all movies with genre descriptions, rating descriptions, movie rank, and user that ranked movie
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
WHERE a.Rank = ?;

-- SQL Query 10: A non-trivial query using at least three tables with aliasing/renaming
-- Purpose: List movies that are part of series, include the series name , the age rating description, and whether their genre is acceptable.
SELECT 
    m.Title AS Movie_Title,
    s.Movie_Series AS Series_Name,
    r.Description AS Age_Rating_Desc,
    g.Acceptable AS Genre_Acceptable
FROM MOVIES m
JOIN SERIES s ON m.Movie_ID = s.Movie_ID
JOIN RATINGS r ON m.Rating = r.Rating
JOIN GENRES g ON m.Genre = g.Genre;
