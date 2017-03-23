SELECT  a.user_id, a.job_id, a.timestamp, j.company_id, j.job_description, j.job_title, j.city, j.state, j.timestamped, c.picture, c.name
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN companys c ON j.company_id=c.company_id
WHERE a.user_id = $1
LIMIT 6
