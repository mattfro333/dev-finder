SELECT flagged_jobs.*, jobs.*, companys.city AS company_city, companys.state AS company_state, companys.company_id, companys.name, companys.picture
FROM flagged_jobs
JOIN jobs
ON flagged_jobs.job_id = jobs.id
JOIN companys
ON jobs.company_id = companys.company_id
WHERE jobs.filled = 'false' AND flagged_jobs.user_id = $1
