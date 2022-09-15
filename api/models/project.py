from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user = db.relationship(
        'User', 
        backref='project',
        cascade='all, delete'
    )
    client = db.relationship(
        'Client', 
        backref='project',
        cascade='all, delete'
    )
    start_date = db.Column(db.DateTime, default=datetime)
    end_date = db.Column(db.DateTime, default=datetime)
    total_DURATION = db.Column(db.Integer)
