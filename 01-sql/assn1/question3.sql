SELECT title, runtime
FROM movie
WHERE runtime = (SELECT MAX(runtime) FROM movie);
