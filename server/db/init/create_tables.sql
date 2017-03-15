CREATE TABLE IF NOT EXISTS applications(
id INTEGER SERIAL PRIMARY KEY,
user_id INTEGER,
job_id INTEGER,
timestamp Date
);

CREATE TABLE IF NOT EXISTS company_reviews(
id INTEGER SERIAL PRIMARY KEY,
company_id INTEGER,
rating INTEGER,
user_id INTEGER,
review TEXT 
);

CREATE TABLE IF NOT EXISTS companys(
company_id INTEGER SERIAL PRIMARY KEY,
name VARCHAR(50),
description TEXT,
industry VARCHAR(20),
picture VARCHAR(500),
city VARCHAR(30),
state VARCHAR(20),
user_id INTEGER,
founded INTEGER
);

CREATE TABLE IF NOT EXISTS devs(
id INTEGER SERIAL PRIMARY KEY,
profilepic VARCHAR(500),
type VARCHAR(20),
description TEXT,
email VARCHAR(50),
github VARCHAR(200),
twitter VARCHAR(200),
lastname VARCHAR(30),
firstname VARCHAR(30),
user_id INTEGER,
city VARCHAR(30),
state VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS experience(
experience_id INTEGER SERIAL PRIMARY KEY,
title VARCHAR(100),
description TEXT,
work_true_education_false BOOLEAN,
user_id INTEGER
);

CREATE TABLE IF NOT EXISTS experience_skills(
id INTEGER SERIAL PRIMARY KEY,
experience_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS flagged_jobs(
flag_id INTEGER SERIAL PRIMARY KEY,
user_id INTEGER,
job_id INTEGER
);

CREATE TABLE IF NOT EXISTS job_skills(
id INTEGER SERIAL PRIMARY KEY,
job_id INTEGER,
skill_id INTEGER,

);

CREATE TABLE IF NOT EXISTS jobs(
id INTEGER SERIAL PRIMARY KEY,
company_id INTEGER,
job_description TEXT,
job_title TEXT,
filled BOOLEAN,
city VARCHAR(30),
state VARCHAR(20),
timestamp DATE
);

CREATE TABLE IF NOT EXISTS message_room(
room_id INTEGER SERIAL PRIMARY KEY,
user1_id INTEGER,
user2_id INTEGER
);

CREATE TABLE IF NOT EXISTS messages(
message_id INTEGER SERIAL PRIMARY KEY,
message TEXT,
sender_id INTEGER,
recipient_id INTEGER,
room_id INTEGER
);

CREATE TABLE IF NOT EXISTS portfolio_pieces(
id INTEGER SERIAL PRIMARY KEY,
user_id INTEGER,
title VARCHAR(50),
description TEXT,
image_url VARCHAR(500),
link_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS portfolio_skills(
id INTEGER SERIAL PRIMARY KEY,
portfolio_piece_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS skills(
skill_id INTEGER SERIAL PRIMARY KEY,
skill_name VARCHAR(50);
icon_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS user_companies(
id INTEGER SERIAL PRIMARY KEY,
user_id INTEGER,
company_id INTEGER
);

CREATE TABLE IF NOT EXISTS user_experience(
id INTEGER SERIAL PRIMARY KEY,
user_id INTEGER,
experience_id INTEGER
);

CREATE TABLE IF NOT EXISTS user_skills(
id INTEGER SERIAL PRIMARY KEY,
user_id INTEGER,
skill_id INTEGER
);

CREATE TABLE IF NOT EXISTS users(
user_id INTEGER SERIAL PRIMARY KEY,
username VARCHAR(50);
password VARCHAR(50);
company BOOLEAN
);