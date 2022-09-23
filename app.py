import email
from flask import (
    Flask,
    redirect,
    jsonify,
    request,
    g,
    session,
    render_template
)
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os
import cloudinary.uploader

from db import get_db, close_db

app = Flask(
    __name__,
    static_folder='client/build/static',
    template_folder='client/build'
    )
app.secret_key = os.environ.get('SECRET_KEY')

@app.before_request
def connect_to_db():
    get_db()

@app.after_request
def disconnect_from_db(response):
    close_db()
    return response

# # # # # # # # # # # # # # # # # # # # 
# USERS 
# # # # # # # # # # # # # # # # # # # # 

# List all users 
@app.route('/api/users')
def users():
    query = """
        SELECT id, first_name, last_name, email, phone, username 
        FROM users
    """

    g.db['cursor'].execute(query)
    users = g.db['cursor'].fetchall()
    return jsonify(users)

# List selected user
@app.route('/api/users/<user_id>')
def show_user(user_id):
    cur = g.db['cursor']

    query = """
        SELECT * FROM users
        WHERE users.id = %s
    """

    cur.execute(query, (user_id,))
    user = cur.fetchone()
    return jsonify(user)

# Update selected user
@app.route('/api/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    phone = request.form['phone']

    query = """
        UPDATE users
        SET first_name = %s, last_name = %s, email = %s, phone = %s
        WHERE users.id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (first_name, last_name, email, phone, user_id))
    g.db['connection'].commit() 
    user = g.db['cursor'].fetchone()

    # Remove password_hash from json dictionary to prevent the hash from being shown.
    user.pop('password_hash')

    # Keep user in session after logging in.
    session['user'] = user
    return jsonify(user)


# # # # # # # # # # # # # # # # # # # # 
# CLIENTS 
# # # # # # # # # # # # # # # # # # # # 

# List all clients
@app.route('/api/clients')
def clients():
    query = """
        SELECT * 
        FROM clients
        ORDER BY id ASC
    """

    g.db['cursor'].execute(query)
    clients = g.db['cursor'].fetchall()
    return jsonify(clients)

# List selected client
@app.route('/api/clients/<client_id>')
def show_client(client_id):
    cur = g.db['cursor']

    query = """
        SELECT * FROM clients
        WHERE clients.id = %s
    """

    cur.execute(query, (client_id,))
    client = cur.fetchone()
    return jsonify(client)

# Update selected client
@app.route('/api/clients/<client_id>', methods=['PUT'])
def update_client(client_id):
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    phone = request.json['phone']
    company = request.json['company']

    query = """
        UPDATE clients
        SET first_name = %s, last_name = %s, email = %s, phone = %s, company = %s
        WHERE clients.id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (first_name, last_name, email, phone, company, client_id))
    g.db['connection'].commit() 
    client = g.db['cursor'].fetchone()
    return jsonify(client)

# Make new client
@app.route('/api/clients/new', methods=['POST'])
def new_client():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    phone = request.json['phone']
    company = request.json['company']

    user = session.get('user', None)
    if user is None:
        return jsonify(success=False, msg='You must be logged in to add a new client.')
    
    query = """
        INSERT INTO clients
        (first_name, last_name, email, phone, company)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
    """

    g.db['cursor'].execute(query, (first_name, last_name, email, phone, company))
    g.db['connection'].commit()
    client = g.db['cursor'].fetchone()
    return jsonify(client)

# Delete client
@app.route('/api/clients/<client_id>', methods=['DELETE'])
def delete_client(client_id):
    query = """
        DELETE FROM clients
        WHERE id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (client_id,))
    g.db['connection'].commit()
    client = cur.fetchone()
    return jsonify(client)

# # # # # # # # # # # # # # # # # # # # 
# ACTIVITIES 
# # # # # # # # # # # # # # # # # # # # 

# List all activities
@app.route('/api/activities')
def activities():
    query = """
        SELECT * 
        FROM activities
        ORDER BY id ASC
    """
    g.db['cursor'].execute(query)
    activities = g.db['cursor'].fetchall()
    return jsonify(activities)

# List selected activity
@app.route('/api/activities/<activity_id>')
def show_activity(activity_id):
    cur = g.db['cursor']

    query = """
        SELECT * FROM activities
        WHERE activities.id = %s
    """

    cur.execute(query, (activity_id,))
    activity = cur.fetchone()
    return jsonify(activity)

# Update selected activity
@app.route('/activities/<activity_id>', methods=['PUT'])
def update_activity(activity_id):
    name = request.json['name']

    query = """
        UPDATE activities
        SET name = %s
        WHERE activities.id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (name, activity_id))
    g.db['connection'].commit() 
    activity = g.db['cursor'].fetchone()
    return jsonify(activity)

# Make new activity
@app.route('/api/activities/new', methods=['POST'])
def new_activity():
    name = request.json['first_name']

    user = session.get('user', None)
    if user is None:
        return jsonify(success=False, msg='You must be logged in to add a new client.')
    
    query = """
        INSERT INTO activities
        (name)
        VALUES (%s)
        RETURNING *
    """

    g.db['cursor'].execute(query, (name,))
    g.db['connection'].commit()
    client = g.db['cursor'].fetchone()
    return jsonify(client)

# Delete activity
@app.route('/api/activities/<activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    query = """
        DELETE FROM activities
        WHERE id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (activity_id,))
    g.db['connection'].commit()
    activity = cur.fetchone()
    return jsonify(activity)

# # # # # # # # # # # # # # # # # # # # 
# PROJECTS 
# # # # # # # # # # # # # # # # # # # # 

# List all projects
@app.route('/api/projects')
def projects():
    query = """
        SELECT name AS project_name, clients.company AS client_company, CONCAT(users.first_name, ' ', users.last_name) AS user, start_date, end_date, total_duration
        FROM projects
        JOIN users ON projects.user_id = users.id
        JOIN clients ON projects.user_id = clients.id;
    """
    g.db['cursor'].execute(query)
    projects = g.db['cursor'].fetchall()
    return jsonify(projects)

# List each project
@app.route('/api/projects/<project_id>')
def show_project(project_id):
    cur = g.db['cursor']

    query = """
        SELECT name AS project_name, clients.company AS client_company, CONCAT(users.first_name, ' ', users.last_name) AS user, start_date, end_date, total_duration
        FROM projects
        JOIN users ON projects.user_id = users.id
        JOIN clients ON projects.user_id = clients.id;
    """

    cur.execute(query, (project_id,))
    project = cur.fetchone()
    return jsonify(project)

# Create new project
@app.route('/api/projects/new', methods=['POST'])
def new_project():
    name = request.json['name']
    client_id = request.json['client_id']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    total_duration = request.json['total_duration']

    user = session.get('user', None)
    if user is None:
        return jsonify(success=False, msg='You must be logged in to create a new project.')

    query = """
        INSERT INTO projects
        (name, user_id, client_id, start_date, end_date, total_duration)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *
    """

    g.db['cursor'].execute(query, (name, user['id'], client_id, start_date, end_date, total_duration))
    g.db['connection'].commit()
    project = g.db['cursor'].fetchone()
    return jsonify(project)

# Update selected project
@app.route('/api/projects/<project_id>', methods=['PUT'])
def update_project(project_id):
    name = request.json['name']
    client_id = request.json['client_id']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    total_duration = request.json['total_duration']

    query = """
        UPDATE projects
        SET name = %s, client_id = %s, start_date = %s, end_date = %s, total_duration = %s
        WHERE projects.id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (name, client_id, start_date, end_date, total_duration, project_id))
    g.db['connection'].commit() 
    project = g.db['cursor'].fetchone()
    return jsonify(project)

# Delete Project
@app.route('/api/projects/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    query = """
        DELETE FROM projects
        WHERE id = %s
        RETURNING *
    """

    cur = g.db['cursor']
    cur.execute(query, (project_id,))
    g.db['connection'].commit()
    project = cur.fetchone()
    return jsonify(project)

# # # # # # # # # # # # # # # # # # # # 
# TIMESHEETS 
# # # # # # # # # # # # # # # # # # # # 

# List all timesheets
@app.route('/api/timesheets')
def timesheets():
    query = """
        SELECT timesheets.id, CONCAT(users.first_name, ' ', users.last_name) AS user, clients.company AS client, projects.name AS project, activities.name AS activity, date, duration, comments
        FROM timesheets
        JOIN users ON timesheets.user_id = users.id
        JOIN clients ON timesheets.client_id = clients.id
        JOIN projects ON timesheets.project_id = projects.id
        JOIN activities ON timesheets.activity_id = activities.id
    """

    g.db['cursor'].execute(query)
    timesheets = g.db['cursor'].fetchall()
    return jsonify(timesheets)

# List each timesheet
@app.route('/api/timesheets/<timesheet_id>')
def show_timesheet(timesheet_id):
    cur = g.db['cursor']

    query = """
        SELECT timesheets.id, CONCAT(users.first_name, ' ', users.last_name) AS user, clients.company AS client, projects.name AS project, activities.name AS activity, date, duration, comments
        FROM timesheets
        JOIN users ON timesheets.user_id = users.id
        JOIN clients ON timesheets.client_id = clients.id
        JOIN projects ON timesheets.project_id = projects.id
        JOIN activities ON timesheets.activity_id = activities.id
        WHERE timesheets.id = %s
    """

    cur.execute(query, (timesheet_id,))
    timesheet = cur.fetchone()
    return jsonify(timesheet)

# Create new timesheet
@app.route('/api/timesheets/new')
def new_timesheet():
    client_id = request.json['client_id']
    project_id = request.json['project_id']
    activity_id = request.json['activity_id']
    date = request.json['date']
    duration = request.json['duration']
    comments = request.json['comments']

    user = session.get('user', None)
    if user is None:
        return jsonify(success=False, msg='You must be logged in to create a new timesheet.')

    query = """
        INSERT INTO timesheets
        (user_id, client_id, project_id, activity_id, date, duration, duration)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """

    g.db['cursor'].execute(query, (user['id'], client_id, project_id, activity_id, date, duration, comments))
    g.db['connection'].commit()
    project = g.db['cursor'].fetchone()
    return jsonify(project)

# # # # # # # # # # # # # # # # # # # # 
# DASHBOARD
# # # # # # # # # # # # # # # # # # # # 

# Project Duration
@app.route('/api/dashboard/projectduration')
def project_duration():
    query = """
        SELECT name AS project, total_duration AS duration
        FROM projects
        JOIN clients ON projects.user_id = clients.id
        ORDER BY total_duration DESC
        LIMIT 10
    """

    g.db['cursor'].execute(query)
    project_duration = g.db['cursor'].fetchall()
    return jsonify(project_duration)

# Project Split
@app.route('/api/dashboard/projectsplit')
def project_split():
    query = """
        SELECT CONCAT(users.first_name, ' ', users.last_name) AS user, COUNT(*) AS number_of_projects
        FROM projects
        JOIN users 
        ON projects.user_id = users.id
        GROUP BY users.first_name, users.last_name
        ORDER BY number_of_projects DESC;
    """

    g.db['cursor'].execute(query)
    project_split = g.db['cursor'].fetchall()
    return jsonify(project_split)

# # # # # # # # # # # # # # # # # # # # 
# REGISTER
# # # # # # # # # # # # # # # # # # # # 
@app.route('/register', methods=['POST'])
def register():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    phone = request.json['phone']
    username = request.json['username']
    password = request.json['password']
    password_hash = generate_password_hash(password)
    query = """
        INSERT INTO users
        (first_name, last_name, email, phone, username, password_hash)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id, first_name, last_name, email, phone, username
    """
    cur = g.db['cursor']

    try:
        cur.execute(query, (first_name, last_name, email, phone, username, password_hash))
    except psycopg2.IntegrityError:
        return jsonify(success=False, msg='Username already taken.')

    g.db['connection'].commit()
    user = cur.fetchone()
    session['user'] = user
    return jsonify(success=True, user=user)

# # # # # # # # # # # # # # # # # # # # 
# LOGIN
# # # # # # # # # # # # # # # # # # # # 
@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    query = """
        SELECT * 
        FROM users
        WHERE username = %s
    """

    cur = g.db['cursor']
    cur.execute(query, (username,))

    user = cur.fetchone()
    # Check if user exists.
    if user is None:
        return jsonify(success=False, msg='Username or password is incorrect.')

    password_matches = check_password_hash(user['password_hash'], password)
    # Check if password matches.
    if not password_matches:
        return jsonify(success=False, msg='Username or password is incorrect.')

    # Remove password_hash from json dictionary to prevent the hash from being shown.
    user.pop('password_hash')

    # Keep user in session after logging in.
    session['user'] = user
    return jsonify(success=True, user=user)

# # # # # # # # # # # # # # # # # # # # 
# LOGOUT
# # # # # # # # # # # # # # # # # # # # 
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(success=True)

# # # # # # # # # # # # # # # # # # # # 
# AUTHENTICATION
# # # # # # # # # # # # # # # # # # # # 
@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)
    else:
        return jsonify(success=False, msg='User is not logged in.')

      
# # # # # # # # # # # # # # # # # # # # 
# DEPLOYMENT
# # # # # # # # # # # # # # # # # # # #   
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    return render_template('index.html')