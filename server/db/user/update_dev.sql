UPDATE devs
SET
firstname = COALESCE($1, firstname),
lastname = COALESCE($2, lastname),
email = COALESCE($3, email),
city = COALESCE($4, city),
state = COALESCE($5, state),
description = COALESCE($6, description),
type = COALESCE($7, type),
github = COALESCE($9, github),
twitter = COALESCE($10, twitter),
skills = COALESCE($11, skills)
WHERE user_id = $8;
