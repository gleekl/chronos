DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) UNIQUE NOT NULL,
    last_name VARCHAR(100) UNIQUE NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL
);