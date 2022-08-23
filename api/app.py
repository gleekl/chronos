from flask import (
    Flask,
    redirect,
    jsonify,
    request,
    g,
    session
)
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os
import cloudinary.uploader

from .db import get_db, close_db

app = Flask(__name__)
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
@app.route('/users')
def users():
    query = """
        SELECT id, name, username FROM users
        ORDER BY id ASC
    """
    g.db['cursor'].execute(query)
    users = g.db['cursor'].fetchall()
    return jsonify(users)

# # # # # # # # # # # # # # # # # # # # 
# CLIENTS 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/clients')
def clients():
    query = """
        SELECT * FROM clients
        ORDER BY id ASC
    """
    g.db['cursor'].execute(query)
    clients = g.db['cursor'].fetchall()
    return jsonify(clients)

# # # # # # # # # # # # # # # # # # # # 
# NEW CLIENTS 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/clients/new', methods=['POST'])
def new_client():
    name = request.form['name']
    user = session.get('user', None)

    if user is None:
        return jsonify(success=False, msg='You must be logged in to adda a new client.')
    
    query = """
        INSERT INTO clients
        (name)
        VALUES (%s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (name,))
    g.db['connection'].commit()
    client = g.db['cursor'].fetchone()
    return jsonify(client)

# # # # # # # # # # # # # # # # # # # # 
# ACTIVITIES 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/activities')
def activities():
    query = """
        SELECT * FROM activities
        ORDER BY id ASC
    """
    g.db['cursor'].execute(query)
    activities = g.db['cursor'].fetchall()
    return jsonify(activities)

# # # # # # # # # # # # # # # # # # # # 
# PROJECTS 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/projects')
def projects():
    query = """
        SELECT * FROM projects
        ORDER BY id ASC
    """
    g.db['cursor'].execute(query)
    projects = g.db['cursor'].fetchall()
    return jsonify(projects)

# # # # # # # # # # # # # # # # # # # # 
# NEW PROJECTS 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/projects/new', methods=['POST'])
def new_projects():
    name = request.form['name']
    client_id = request.form['client_id']
    date_start = request.form['date_start']
    date_end = request.form['date_end']
    total_duration = request.form['total_duration']

    user = session.get('user', None)
    if user is None:
        return jsonify(success=False, msg='You must be logged in to create a new project.')

    query = """
        INSERT INTO projects
        (name, user_id, client_id, date_start, date_end, total_duration)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *
    """

    g.db['cursor'].execute(query, (name, user['id'], client_id, date_start, date_end, total_duration))
    g.db['connection'].commit()
    project = g.db['cursor'].fetchone()
    return jsonify(project)

# # # # # # # # # # # # # # # # # # # # 
# TIMESHEETS 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/timesheets')
def timesheets():
    query = """
        SELECT * FROM timesheets
        ORDER BY id ASC
    """
    g.db['cursor'].execute(query)
    timesheets = g.db['cursor'].fetchall()
    return jsonify(timesheets)

# # # # # # # # # # # # # # # # # # # # 
# NEW TIMESHEETS 
# # # # # # # # # # # # # # # # # # # # 
@app.route('/timesheets/new')
def new_timesheets():
    client_id = request.form['client_id']
    project_id = request.form['project_id']
    activity_id = request.form['activity_id']
    date = request.form['date']
    duration = request.form['duration']
    comments = request.form['comments']

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
# REGISTER
# # # # # # # # # # # # # # # # # # # # 
@app.route('/register', methods=['POST'])
def register():
    name = request.json['name']
    username = request.json['username']
    password = request.json['password']
    password_hash = generate_password_hash(password)
    query = """
        INSERT INTO users
        (name, username, password_hash)
        VALUES (%s, %s, %s)
        RETURNING id, name, username
    """
    cur = g.db['cursor']
    try:
        cur.execute(query, (name, username, password_hash))
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
    username: request.json['username']
    password: request.json['password']

    query = """
        SELECT * FROM users
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
