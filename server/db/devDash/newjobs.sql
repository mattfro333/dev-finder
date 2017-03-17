SELECT j.*, c.picture, c.industry, c.name FROM jobs j
JOIN companys c
ON j.company_id = c.company_id
ORDER BY timestamped Desc
LIMIT 8;
