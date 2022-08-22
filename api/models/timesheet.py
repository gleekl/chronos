from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Timesheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project = db.relationship(
        'Project', 
        backref='timesheet',
        cascade='all, delete'
    )
    user = db.relationship(
        'User', 
        backref='timesheet',
        cascade='all, delete'
    )
    client = db.relationship(
        'Client', 
        backref='timesheet',
        cascade='all, delete'
    )
    date_start = db.Column(db.DateTime, default=datetime)
    date_end = db.Column(db.DateTime, default=datetime)
    total_time = db.Column(db.Integer)