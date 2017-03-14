SELECT  applications.user_id, applications.job_id, applications.timestamped, jobs.company_id, jobs.job_description, jobs.job_title, jobs.location, jobs.timestamped
FROM applications
INNER JOIN jobs
ON applications.job_id = jobs.id
WHERE user_id = $1
