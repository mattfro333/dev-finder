SELECT j.* FROM jobs j
JOIN companys c
ON jobs.company_id = companys.company_id
where LOWER(job_title)  like LOWER($1);
