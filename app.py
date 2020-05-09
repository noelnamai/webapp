import mysql.connector as mysql
from flask import Flask, request

app = Flask(__name__)


@app.route("/api/genes", methods=["GET", "POST"])
def collection():
    if request.method == "GET":
        pass  #handle GET all Request
    elif request.method == "POST":
        pass  #handle POST request


@app.route("/api/samples", methods=["GET", "POST"])
def collection():
    if request.method == "GET":
        pass  #handle GET all Request
    elif request.method == "POST":
        pass  #handle POST request


@app.route("/api/gene/<hgnc_name>", methods=["GET", "PUT", "DELETE"])
def resource(hgnc_name):
    if request.method == "GET":
        pass  #handle GET single request
    elif request.method == "PUT":
        pass  #handle UPDATE request
    elif request.method == "DELETE":
        pass  #handle DELETE request


@app.route("/api/sample/<sample_id>", methods=["GET", "PUT", "DELETE"])
def resource(sample_id):
    if request.method == "GET":
        pass  #handle GET single request
    elif request.method == "PUT":
        pass  #handle UPDATE request
    elif request.method == "DELETE":
        pass  #handle DELETE request


if __name__ == "__main__":
    app.debug = True
    app.run()
