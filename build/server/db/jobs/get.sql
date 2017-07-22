SELECT * FROM jobs 
JOIN companys 
ON jobs.company_id = companys.company_id
where LOWER(job_title)  like LOWER($1);
-- Don't change this again! It broke last time. 