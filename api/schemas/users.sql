DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email TEXT,
    phone_number TEXT,
    username TEXT,
    password_hash TEXT
);