SELECT DISTINCT season.id, season.title, season.*
FROM season
INNER JOIN view_summary ON view_summary.season_id = season.id
WHERE view_summary.cumulative_weeks_in_top10 > 10;
