SELECT season.title
FROM season
INNER JOIN tv_show ON season.tv_show_id = tv_show.id
WHERE tv_show.title = 'Breaking Bad';
