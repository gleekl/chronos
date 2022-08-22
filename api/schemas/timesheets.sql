DROP TABLE IF EXISTS timesheets CASCADE;

CREATE TABLE timesheets (
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
    client_id SERIAL REFERENCES clients (id) ON DELETE CASCADE,
    project_id SERIAL REFERENCES projects (id) ON DELETE CASCADE,
    activity_id SERIAL REFERENCES activities (id) ON DELETE CASCADE,
    date DATE NOT NULL,
    duration INTEGER NOT NULL,
    comments TEXT
)