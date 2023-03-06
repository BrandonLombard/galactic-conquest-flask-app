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
        # This updates the players stats if they purchase something at the shop
        form_strength = int(request.form.get("strength"))
        form_speed = int(request.form.get("speed"))
        form_armor = int(request.form.get("armor"))
        form_price = int(request.form.get("price"))

        if current_user.galactic_gems >= form_price:
            current_user.strength = current_user.strength + form_strength
            current_user.speed = current_user.speed + form_speed
            current_user.armor = current_user.armor + form_armor
            current_user.galactic_gems = current_user.galactic_gems - form_price
            flash('Thank you for your purchase!', category='success')
        else:
            flash('Unable to purchase these items due to insufficient funds.', category='error')
        db.session.commit()
        

    # elif request.method == 'GET':
    #     user_stats = json.loads(request.data)
    #     planets_defeated = user_stats['planets_defeated']

        # if len(note) < 1:
        #     flash('Note is too short!', category='error')
        # else:
        #     new_note = Note(data=note, user_id=current_user.id)
        #     db.session.add(new_note)
        #     db.session.commit()
        #     flash('Note added!', category='success')

    return render_template("home.html", user=current_user)  # , stats=user_stats

@views.route('/complete-purchase', methods=['POST'])
def completePurchase():
    note = json.loads(request.data)  # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
    
    return jsonify({})

