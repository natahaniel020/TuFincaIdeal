from flask import Blueprint, jsonify, request
from Services.FincasServices import obtener_por_Municipio  # o donde esté la función

api_fincas = Blueprint("fincas", __name__)

@api_fincas.route("/fincas", methods=["GET"])
def obtener_fincas():
    municipio = request.args.get("municipio")
    datos = obtener_por_Municipio(municipio)
    return jsonify(datos)
