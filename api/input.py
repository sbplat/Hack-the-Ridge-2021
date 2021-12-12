import flask
from flask import request, jsonify
import json
app = flask.Flask(__name__)
app.config["DEBUG"] = True


# Create some test data for our catalog in the form of a list of dictionaries.
UList = open("Dictionary.json")
InputList = open("OutFile.txt", "r")

Universities = ""
InputLines = InputList.readlines()
Programs = []
count= 0
uni = str(InputLines[-1])

Udata = json.load(UList)
        


@app.route('/', methods=['GET'])
def home():
    return '''<h1>University Find</h1>
<p>A prototype API for finding appropriate Universities.</p>'''


@app.route('/api/v1/resources/University/all', methods=['GET'])
def api_all():
    return jsonify(Udata)
@app.route('/api/v1/resources/University', methods = ['GET'])
def api_mark():
    if 'mark' in request.args:
        mark = int(request.args['mark'])
    results = []
    
    for uni in Udata['Universities']:
        
         if int(uni["Algoma University"]["Accounting (BA 3 year)"]["grade_needed"]) <= mark:
            print(mark)
            results.append(uni)
    return jsonify(results)

@app.route('/api/v1/resources/University', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    if 'id' in request.args:
        
        id = int(request.args['id'])
    else:
        return "Error: Specify an ID."


    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for uni1 in Udata['Universities']:
        for uni in uni1:
            if uni['id'] == id:
        
                results.append(uni) 

    # Use the jsonify function from Flask to convert our list to JSON
    return jsonify(results)

app.run()

