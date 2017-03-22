CREATE TABLE IF NOT EXISTS applications(
id SERIAL PRIMARY KEY,
user_id INTEGER,
job_id INTEGER,
timestamp Date
);

CREATE TABLE IF NOT EXISTS company_reviews(
id SERIAL PRIMARY KEY,
company_id INTEGER,
rating INTEGER,
user_id INTEGER,
review TEXT
);

CREATE TABLE IF NOT EXISTS companys(
company_id SERIAL PRIMARY KEY,
name VARCHAR(50),
description TEXT,
industry VARCHAR(20),
picture TEXT,
city VARCHAR(30),
state VARCHAR(30),
user_id INTEGER,
founded INTEGER
);

CREATE TABLE IF NOT EXISTS devs(
id SERIAL PRIMARY KEY,
profilepic TEXT,
type VARCHAR(30),
description TEXT,
email VARCHAR(100),
github VARCHAR(200),
twitter VARCHAR(200),
lastname VARCHAR(40),
firstname VARCHAR(40),
user_id INTEGER,
city VARCHAR(30),
state VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS experience(
experience_id SERIAL PRIMARY KEY,
title VARCHAR(100),
description TEXT,
work_true_education_false BOOLEAN,
start_month INTEGER,
start_year INTEGER,
end_month INTEGER,
end_year INTEGER,
user_id INTEGER,
job_title VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS experience_skills(
id SERIAL PRIMARY KEY,
experience_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS flagged_jobs(
flag_id SERIAL PRIMARY KEY,
user_id INTEGER,
job_id INTEGER
);

CREATE TABLE IF NOT EXISTS job_skills(
id SERIAL PRIMARY KEY,
job_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS jobs(
id SERIAL PRIMARY KEY,
company_id INTEGER,
job_description TEXT,
job_title TEXT,
filled BOOLEAN,
city VARCHAR(100),
state VARCHAR(100),
timestamped DATE,
skills JSON
);

CREATE TABLE IF NOT EXISTS message_room(
room_id SERIAL PRIMARY KEY,
user1_id INTEGER,
user2_id INTEGER,
user1_name VARCHAR(50),
user2_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS messages(
message_id SERIAL PRIMARY KEY,
message TEXT,
sender_id INTEGER,
room_id INTEGER,
createdtime DATE
);

CREATE TABLE IF NOT EXISTS portfolio_pieces(
id SERIAL PRIMARY KEY,
user_id INTEGER,
title VARCHAR(50),
description TEXT,
image_url VARCHAR(500),
link_url VARCHAR(500),
skills JSON
);

CREATE TABLE IF NOT EXISTS portfolio_skills(
id SERIAL PRIMARY KEY,
portfolio_piece_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS skills(
skill_id SERIAL PRIMARY KEY,
skill_name VARCHAR(50),
icon_url VARCHAR(500),
text TEXT,
key TEXT
);

CREATE TABLE IF NOT EXISTS user_companies(
id SERIAL PRIMARY KEY,
user_id INTEGER,
company_id INTEGER
);

CREATE TABLE IF NOT EXISTS user_experience(
id SERIAL PRIMARY KEY,
user_id INTEGER,
experience_id INTEGER
);

CREATE TABLE IF NOT EXISTS user_skills(
id SERIAL PRIMARY KEY,
user_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS users(
user_id SERIAL PRIMARY KEY,
username VARCHAR(50),
password TEXT,
company BOOLEAN
);
