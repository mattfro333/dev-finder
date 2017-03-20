SELECT * FROM applications 
JOIN devs
ON applications.user_id=devs.user_id
JOIN jobs 
ON applications.job_id=jobs.id
JOIN companys
ON jobs.company_id = companys.company_id
WHERE companys.user_id = $1