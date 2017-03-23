UPDATE companys
SET
name = COALESCE($2, name),
city = COALESCE($3, city),
state = COALESCE($4, state),
founded = COALESCE($5, founded),
description = COALESCE($6, description)
WHERE company_id = $1;
