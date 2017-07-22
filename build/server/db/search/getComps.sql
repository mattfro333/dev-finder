SELECT * FROM companys 
where LOWER(name)  like LOWER($1);