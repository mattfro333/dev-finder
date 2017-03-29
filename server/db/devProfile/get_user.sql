SELECT *
FROM users
INNER JOIN devs
ON devs.user_id = users.user_id
WHERE users.user_id = $1
