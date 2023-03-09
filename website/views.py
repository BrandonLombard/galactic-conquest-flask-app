from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import User
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        # This updates the player's game stats when they win a level
        form_gems = request.form.get("gems")
        
        # Determine if form_gems is not a NoneType
        # And if so, Update the player's progress
        if form_gems is not None:
            form_xp = int(request.form.get("xp"))
            form_gems = int(request.form.get("gems"))
            current_user.galactic_gems = current_user.galactic_gems + form_gems
            current_user.exp_points = current_user.exp_points + form_xp
            current_user.planets_defeated = current_user.planets_defeated + 1
            flash('Your progress has been successfully saved!', category='success')
        else:
            # This updates the players stats if they purchase something at the shop
            form_strength = int(request.form.get("strength"))
            form_speed = int(request.form.get("speed"))
            form_armor = int(request.form.get("armor"))
            form_price = int(request.form.get("price"))
            # Determine the total price
            total = (form_strength + form_speed + form_armor) * 100

            # Make sure the player can't purchase the item unless their gem count is above the total cost
            if current_user.galactic_gems >= total:
                current_user.strength = current_user.strength + form_strength
                current_user.speed = current_user.speed + form_speed
                current_user.armor = current_user.armor + form_armor
                current_user.galactic_gems = current_user.galactic_gems - form_price
                flash('Thank you for your purchase!', category='success')
            else:
                flash('Unable to purchase these items due to insufficient funds.', category='error')
        db.session.commit()
        
    return render_template("home.html", user=current_user)

@views.route('/about', methods=['GET'])
def about():
    return render_template("about.html", user=current_user)

@views.route('/update-game', methods=['POST'])
def update_game():
    note = json.loads(request.data)  # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']
    noteId = note['noteId']
    note = User.query.get(noteId)
    

