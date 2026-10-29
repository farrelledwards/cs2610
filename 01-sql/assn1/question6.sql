SELECT season.id, season.title, SUM(view_summary.hours_viewed) AS total_hours_viewed
FROM view_summary
INNER JOIN season ON view_summary.season_id = season.id
INNER JOIN tv_show ON season.tv_show_id = tv_show.id
WHERE tv_show.title = 'Peppa Pig'
GROUP BY season.id, season.title;
