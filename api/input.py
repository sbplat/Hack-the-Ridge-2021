import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import json

app = flask.Flask(__name__)
cors = CORS(app)

app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.
data = json.load(open("Dictionary.json"))
#print(data)

@app.route('/', methods=['GET'])
@cross_origin()
def home():
    args = json.loads([x for x in request.args.keys()][0])
    uni = args["university"]
    tags = args["tags"]
    courses = args["courses"]

    top = 0

    marks = sorted(list(courses.values()), reverse = True)
    if len(marks) <= 6:
        top = round(sum(marks) / len(marks))
    else:
        top = round(sum(marks[:6] / 6))

    eligible_programs = []

    for universityName in data:
        if uni == "None" or uni == universityName:
            first = True

            for program in data[universityName]:
                if first:
                    first = False
                    continue
                print(program)

                min_grade = 0
                try:
                    min_grade = int(data[universityName][program]["grade_needed"])
                except ValueError:
                    pass

                if top >= min_grade:
                    eligible_programs.append(f"{universityName}: {program}")

    return str(eligible_programs);

app.run()
