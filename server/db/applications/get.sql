SELECT  *
FROM applications
INNER JOIN jobs
ON applications.job_id = jobs.id
INNER JOIN companys
ON companys.company_id = jobs.company_id
WHERE applications.user_id = $1
