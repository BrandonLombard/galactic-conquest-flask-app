from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
    
# # User score and game information
# class gameData(db.Model):
#      id = db.Column(db.Integer, primary_key=True)
#      exp_points = db.Column(db.Integer)
#      galactic_gems = db.Column(db.Integer)
#      planets_defeated = db.Column(db.Integer)
#      strength = db.Column(db.Integer)
#      speed = db.Column(db.Integer)
#      armor = db.Column(db.Integer)
#      user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
# User account data
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    character = db.Column(db.String(150))
    exp_points = db.Column(db.Integer)
    galactic_gems = db.Column(db.Integer)
    planets_defeated = db.Column(db.Integer)
    strength = db.Column(db.Integer)
    speed = db.Column(db.Integer)
    armor = db.Column(db.Integer)


