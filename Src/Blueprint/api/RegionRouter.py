from flask import Blueprint, jsonify
from Services import RegionesServices

api_regiones = Blueprint("api_regiones", __name__, url_prefix="/api")

@api_regiones.route("/regiones")
def regiones():
    return jsonify(RegionesServices.obtener_regiones())

