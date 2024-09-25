from flask import Flask, jsonify, request
from marshmallow import Schema, fields, ValidationError
from flask_cors import CORS 
import json
import uuid 
from datetime import datetime
import time

app = Flask(__name__)
CORS(app)

def readTodos():
    try:
        with open('data.json', 'r') as f:
            return json.load(f)
            # return todos[::-1]
    except FileNotFoundError:
        return []

def writeTodos(todos):
    with open('data.json', 'w') as f:
        json.dump(todos, f, indent=4)

@app.route('/todos', methods=['GET'])
def getTodos():
    try:
        todos = readTodos()
        return jsonify(todos) if todos else jsonify([]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/todos/closed', methods=['GET'])
def getClosedTodos():
    try:
        todos = readTodos()  
        closed_todos = [todo for todo in todos if todo['status'] == 'closed']  
        return jsonify(closed_todos) if closed_todos else jsonify([]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/todo/closed/<string:id>', methods=['PATCH'])
def closedTodo(id):
    try:
        todos = readTodos()
        todo = next((todo for todo in todos if todo['id'] == id), None)

        if not todo:
            return jsonify({"error": "Todo non trovata"}), 404

        todo['status'] = 'closed'
        writeTodos(todos)

        return jsonify({"message": "Todo chiusa con successo", "todo": todo}), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/todo/open/<string:id>', methods=['PATCH'])
def openTodo(id):
    try:
        todos = readTodos()
        todo = next((todo for todo in todos if todo['id'] == id), None)

        if not todo:
            return jsonify({"error": "Todo non trovata"}), 404

        todo['status'] = 'open'
        writeTodos(todos)

        return jsonify({"message": "Todo aperta con successo", "todo": todo}), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/todo/add', methods=['POST'])
def add_todo():
    try:
        data = request.get_json()

        data['id'] = str(uuid.uuid4()) 

        todos = readTodos()
        todos.append(data)

        writeTodos(todos)

        return jsonify({"message": "Todo aggiunto con successo", "todo": data}), 200

    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        return jsonify({"message": "Errore interno del server", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
