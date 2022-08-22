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

