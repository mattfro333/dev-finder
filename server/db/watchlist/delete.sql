DELETE FROM flagged_jobs
WHERE user_id = $1 AND job_id = $2
