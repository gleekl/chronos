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
    date = db.Column(db.DateTime, default=datetime.utcnow)
    duration = db.Column(db.Integer)
    name = db.Column(db.String(255))