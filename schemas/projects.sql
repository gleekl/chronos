DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
    client_id SERIAL REFERENCES clients (id) ON DELETE CASCADE,
    start_date DATE,
    end_date DATE,
    total_duration INTEGER
)