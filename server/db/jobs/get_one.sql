SELECT * FROM jobs
JOIN companys
ON jobs.company_id = companys.company_id
WHERE id = $1;
