DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
    name TEXT
)