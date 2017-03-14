SELECT flagged_jobs.job_id, jobs.company_id, jobs.job_description, jobs.job_title, jobs.location, jobs.skills, jobs.location, jobs.timestamped, flagged_jobs.user_id
FROM flagged_jobs
INNER JOIN jobs
ON flagged_jobs.job_id = jobs.id
WHERE jobs.filled = 'false' AND flagged_jobs.user_id = $1
