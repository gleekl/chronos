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
        SELECT * FROM users
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
        returning id, name, username
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
