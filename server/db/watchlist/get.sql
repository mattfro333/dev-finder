SELECT *
FROM flagged_jobs
INNER JOIN jobs
ON flagged_jobs.job_id = jobs.id
INNER JOIN companys
ON jobs.company_id = companys.company_id
WHERE jobs.filled = 'false' AND flagged_jobs.user_id = $1
