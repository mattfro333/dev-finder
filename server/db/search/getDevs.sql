SELECT * FROM devs
WHERE LOWER(lastname) 
LIKE LOWER($1)
OR LOWER(firstname) 
LIKE LOWER($1);