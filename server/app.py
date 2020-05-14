import os

from flask import Flask, abort, jsonify, request
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


# init app
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
basedir = os.path.abspath(os.path.dirname(__file__))


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@localhost:3306/webapp"


# init sqlalchemy first
db = SQLAlchemy(app)
ma = Marshmallow(app)


class FpkmTable(db.Model):
    __tablename__ = "fpkm_table"

    id = db.Column(db.Integer, primary_key=True)
    sample = db.Column(db.String(26))
    ensembl_id = db.Column(db.String(26))
    entrez_id = db.Column(db.String(26))
    hgnc_symbol = db.Column(db.String(26))
    full_name = db.Column(db.String(26))
    fpkm = db.Column(db.String(26))

    def __init__(self, sample, ensembl_id, entrez_id, hgnc_symbol, full_name, fpkm):
        self.sample = sample
        self.ensembl_id = ensembl_id
        self.entrez_id = entrez_id
        self.hgnc_symbol = hgnc_symbol
        self.full_name = full_name
        self.fpkm = fpkm


class FpkmTableSchema(ma.Schema):
    class Meta:
        fields = ("sample", "ensembl_id", "entrez_id",
                  "hgnc_symbol", "full_name", "fpkm")


# init schema
by_many_schema = FpkmTableSchema(many=True)


@app.route("/all/genes/", methods=["GET"])
def return_all_genes(sample=None):
    selected = FpkmTable.query.with_entities(FpkmTable.hgnc_symbol)
    selected = selected.distinct()
    result = by_many_schema.dump(selected)

    return jsonify(result) if result else abort(404)


@app.route("/all/samples/", methods=["GET"])
def return_all_samples():
    selected = FpkmTable.query.with_entities(FpkmTable.sample)
    selected = selected.distinct()
    result = by_many_schema.dump(selected)

    return jsonify(result) if result else abort(404)


@app.route("/search/genes/<gene>", methods=["GET"])
def select_by_gene(gene=None):
    selected = FpkmTable.query.filter_by(hgnc_symbol=gene)
    result = by_many_schema.dump(selected)

    return jsonify(result) if result else abort(404)


@app.route("/search/samples/<sample>", methods=["GET"])
def select_by_sample(sample=None):
    selected = FpkmTable.query.filter_by(sample=sample)
    selected = selected.distinct()
    # selected = selected.limit(100)
    selected = selected.distinct()
    result = by_many_schema.dump(selected)

    return jsonify(result) if result else abort(404)


# run server
if __name__ == "__main__":
    app.run(debug=True)
