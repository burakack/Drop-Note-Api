CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
	nickname VARCHAR (50 ) UNIQUE NOT NULL,
    email VARCHAR ( 50 ) UNIQUE NOT NULL,
	password_salt VARCHAR ( 250 ) NOT NULL,
	password_hash VARCHAR ( 250 ) NOT NULL,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE IF NOT EXISTS friends(
    id serial PRIMARY KEY,
    requestee_id int references users(id) NOT NULL,
    requester_id int references users(id) NOT NULL,
    requested_on TIMESTAMP NOT NULL,
    Approved_on TIMESTAMP,
    Declined_on TIMESTAMP
);
CREATE TABLE IF NOT EXISTS notes(
    id serial PRIMARY KEY,
	userid int references Users(id) NOT NULL,
	title VARCHAR ( 250 ) NOT NULL,
	notetext VARCHAR ( 1000 ) NOT NULL,
    is_anonymus BOOLEAN NOT NULL,
    likecount int  DEFAULT 0,
    dislikecount int DEFAULT 0,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE IF NOT EXISTS messages(
    id serial PRIMARY KEY,
	fromuser int references users(id) NOT NULL,
	touser int references users(id) NOT NULL,
	messages VARCHAR ( 1000 ) NOT NULL,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);