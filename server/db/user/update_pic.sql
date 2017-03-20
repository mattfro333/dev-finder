UPDATE devs
SET
profilepic = COALESCE($2, profilepic),
WHERE user_id = $1;
