from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from pymongo import MongoClient
import re
import bcrypt
from bson import ObjectId
from flask_cors import CORS

 
app = Flask(__name__)
CORS(app) # i do not know if this chaged anything but feel free to take out
app.secret_key = 'xyzsdfg'

# Initialize MongoDB client
client = MongoClient("mongodb+srv://admin:password101@quizbank.tx6gspj.mongodb.net/")
db = client.get_database("translations")
users_collection = db.users
cards_collection = db.bank

def is_user_logged_in():
    return 'user_id' in session

#Check if user session is true
@app.route('/check-login', methods=['GET'])
def check_login():
    if 'user_id' in session:
        user_id = session['user_id']
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        if user:
            user_info = {
                "logged_in": True,
                "user": {
                    "first_name": user.get('first_name'),
                    "last_name": user.get('last_name'),
                    # Add other user details
                }
            }
            return jsonify(user_info), 200
    return jsonify({"logged_in": False}), 200

#User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request data missing."}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required fields."}), 400

    user = users_collection.find_one({'username': username})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        session['user_id'] = str(user['_id'])
        return jsonify({"message": "Login successful."}), 200
    else:
        return jsonify({"message": "Invalid credentials."}), 401  # Unauthorized status code

# User Logout 
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logout successful."}), 200

#creating restful friendly endpoints to interact with postman/react
# User registration
@app.route('/register', methods=['POST'])
def register():
    #data will be in Json format
    data = request.get_json()
    #if not in appropriate format or missing, send a message
    if not data:
        return jsonify({"message": "Request data missing."}), 400

    #grabbing the json attributes for user
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, username, email, password]):
        return jsonify({"message": "Please fill out all the fields!"}), 400
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({"message": "Invalid email address!"}), 400
    elif users_collection.find_one({'email': email}):
        return jsonify({"message": "Account already exists!"}), 409  # Conflict status code
    else:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user_data = {
            'first_name': first_name,
            'last_name': last_name,
            'username': username,
            'email': email,
            'password': hashed_password  # Store the hashed password as bytes
        }
        users_collection.insert_one(user_data)
        return jsonify({"message": "You have successfully registered!"}), 201  # Created status code

#Questions Endpoint
#Create Question
@app.route('/cards', methods=['POST'])
def create_card():

    data = request.get_json()
    if not data:
        return jsonify({"message": "Request data missing."}), 400

    english = data.get('english')
    translation = data.get('translation')
    category = data.get('category')
    difficulty = data.get('difficulty')

    try:
        value = int(difficulty)
        if value < 0 or value > 5:
            return jsonify({"message": "Difficulty value must be between 0 and 5."}), 400
    except ValueError:
        return jsonify({"message": "Invalid difficulty value."}), 400

    if not english or not translation:
        return jsonify({"message": "Please insert at least a question and its answer."}), 400

    if cards_collection.find_one({'english': english}):
        return jsonify({"message": "Question already exists."}), 409

    card_data = {
        'english': english,
        'translation': translation,
        'category': category,
        'difficulty': difficulty
    }
    cards_collection.insert_one(card_data)
    return jsonify({"message": "Card added successfully."}), 201

#Delete Question
@app.route('/card/delete', methods=['POST'])
def delete_card():
    if not is_user_logged_in():
        return jsonify({"message": "You must be logged in to delete a Card."}), 401
    user = users_collection.find_one({'_id': ObjectId(session['user_id'])})

    if not user:
        return jsonify({"message": "You must be logged in to delete a Card."}), 401
    data = request.get_json()
    
    if not data:
        return jsonify({"message": "Request data missing."}), 400
    english = data.get('english')
    if not english:
        return jsonify({"message": "Please provide the English translation of the card to delete."}), 400


    deleted_card = cards_collection.find_one_and_delete({'english': english})
    if not deleted_card:
        return jsonify({"message": "Card not found."}), 404

    return jsonify({"message": "Card deleted successfully."}), 200

@app.route('/card/list', methods=['GET'])
def get_card_list():
    if not is_user_logged_in():
        return jsonify({"message": "You must be logged in to add a question."}), 401

    user = users_collection.find_one({'_id': ObjectId(session['user_id'])})
    
    cards = list(cards_collection.find({}))  # Fetch all questions from the collection
    cards_list = []

    for english in english:
        card_item = {
            'question': cards['question'],
            'answer': cards['answer'],
            'category': cards['category'],
            'difficulty': cards['difficulty']
        }
        cards_list.append(card_item)

    return jsonify(cards_list), 200


@app.route('/get-cards-by-category', methods=['GET'])
def get_cards_by_category():
    category = request.args.get('category')

    query = {}
    if category:
        query['category'] = category
    else:
        return jsonify({"message": "Invalid category value."}), 400
    cards = cards_collection.find(query)

    card_list = []
    for english in english:
        card_item = {
            'question': cards['question'],
            'answer': cards['answer'],
            'category': cards['category'],
            'difficulty': cards['difficulty']
        }

    return jsonify(card_list), 200


if __name__ == "__main__":
    app.run(host='localhost', port=5001, debug=True)