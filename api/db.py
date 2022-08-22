from flask import g
import psycopg2
from psycopg2.extras import RealDictCursor
import os

def get_db():
    if 'db' not in g:
        connection = psycopg2.connecti(
            host = os.environ.get('DB_HOST')
        )