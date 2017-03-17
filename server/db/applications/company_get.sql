SELECT d.profilepic, d.user_id, d.firstname, d.lastname, d.state, d.city, j.job_title, j.id, a.timestamp FROM devs d
JOIN applications a ON a.user_id=d.user_id
JOIN jobs j ON a.job_id=j.id
WHERE j.company_id = $1
ORDER BY timestamp DESC
LIMIT 10
