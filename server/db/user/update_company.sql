UPDATE companys
SET
name = COALESCE($1, name),
city = COALESCE($2, city),
state = COALESCE($3, state),
description = COALESCE($4, description)
WHERE user_id = $5;
