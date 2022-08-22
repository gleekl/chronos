DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
    client_id SERIAL REFERENCES clients (id) ON DELETE CASCADE,
    date_start TIMESTAMP,
    date_end TIMESTAMP,
    total_duration INTEGER
)