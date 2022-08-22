DROP TABLE IF EXISTS timesheets CASCADE;

CREATE TABLE timesheets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
    client_id SERIAL REFERENCES clients (id) ON DELETE CASCADE,
    date_start DATE,
    date_end DATE,
    total_duration INTEGER
)