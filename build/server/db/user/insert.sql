INSERT INTO users (username, password, company)
VALUES ($1, $2, $3)
RETURNING *
