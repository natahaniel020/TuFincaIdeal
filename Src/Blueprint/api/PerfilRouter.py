from flask import Blueprint, jsonify, request
from Services.PerfilServises import obtener_finca_por_id  # o donde esté la función

api_perfil = Blueprint("perfil", __name__)

@api_perfil.route("/perfil", methods=["GET"])
def obtenerPerfil():
    perfil = request.args.get("perfil")

    if not perfil:
        return jsonify({"error": "Parámetro 'perfil' requerido"}), 400

    datos = obtener_finca_por_id(perfil)

    if not datos:
        return jsonify({"error": "Perfil no encontrado"}), 404

    return jsonify(datos)
    
