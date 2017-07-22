SELECT
 j.*,
 (SELECT COUNT(a.*)  FROM applications a WHERE j.id=a.job_id)
FROM jobs j
JOIN companys c on j.company_id=c.company_id
WHERE c.company_id=$1
ORDER BY timestamped DESC
