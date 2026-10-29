SELECT title, release_date
FROM movie
WHERE release_date IS NOT NULL
ORDER BY release_date DESC
LIMIT 1;
