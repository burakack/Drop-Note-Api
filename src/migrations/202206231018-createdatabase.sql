CREATE TABLE IF NOT EXISTS Users(
    id serial PRIMARY KEY,
	Nickname VARCHAR ( 50 ) UNIQUE NOT NULL,
	Password_salt VARCHAR ( 50 ) NOT NULL,
	Password_hash VARCHAR ( 250 ) NOT NULL,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE IF NOT EXISTS Friends(
    id serial PRIMARY KEY,
    Requestee_id int references Users(id) NOT NULL,
    Requester_id int references Users(id) NOT NULL,
    Requested_on TIMESTAMP NOT NULL,
    Approved_on TIMESTAMP,
    Declined_on TIMESTAMP
);
CREATE TABLE IF NOT EXISTS Notes(
    id serial PRIMARY KEY,
	userid int references Users(id) NOT NULL,
	Title VARCHAR ( 250 ) NOT NULL,
	Notetext VARCHAR ( 1000 ) NOT NULL,
    is_anonymus BOOLEAN NOT NULL,
    Likecount int  DEFAULT 0,
    Dislikecount int DEFAULT 0,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE IF NOT EXISTS Messages(
    id serial PRIMARY KEY,
	fromuser int references Users(id) NOT NULL,
	touser int references Users(id) NOT NULL,
	Messages VARCHAR ( 1000 ) NOT NULL,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);