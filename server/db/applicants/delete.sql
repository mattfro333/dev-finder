DELETE FROM applications
WHERE user_id = $1 and job_id = $2
