\i schemas/activities.sql
\i schemas/clients.sql
\i schemas/projects.sql
\i schemas/tasks.sql
\i schemas/timesheets.sql
\i schemas/users.sql

ALTER SEQUENCE activities_id_seq RESTART WITH 1;
ALTER SEQUENCE clients_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;
ALTER SEQUENCE tasks_id_seq RESTART WITH 1;
ALTER SEQUENCE timesheets_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

\i seed/activities_seed.sql
\i seed/clients_seed.sql
\i seed/projects_seed.sql
\i seed/tasks_seed.sql
\i seed/timesheets_seed.sql
\i seed/users_seed.sql
