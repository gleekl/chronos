from numbers import Real
from flask import g
import psycopg2
from psycopg2.extras import RealDictCursor
import os

def get_db():
    if 'db' not in g:
        connection = psycopg2.connect(
            host = os.environ.get('DB_HOST'),
            database = os.environ.get('DB_DATABASE'),
            user = os.environ.get('DB_USER'),
            password = os.environ.get('DB_PASSWORD')
        )
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        g.db = {
            'connection': connection,
            'cursor': cursor
        }
    return g.db

def close_db():
    db = g.pop('db', None)
    if db is not None:
        db['cursor'].close()
        db['connection'].close()