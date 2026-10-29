WITH season_hours AS (
    SELECT season.title, SUM(view_summary.hours_viewed) AS total_hours_viewed
    FROM view_summary
    INNER JOIN season ON view_summary.season_id = season.id
    INNER JOIN tv_show ON season.tv_show_id = tv_show.id
    WHERE tv_show.title = 'Breaking Bad'
    GROUP BY season.title
)
SELECT title, total_hours_viewed
FROM season_hours
WHERE total_hours_viewed = (SELECT MAX(total_hours_viewed) FROM season_hours);
