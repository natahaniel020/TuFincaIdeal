from flask import Blueprint, jsonify, request
from Services import MunicipioServices

api_municipio= Blueprint(
    "api_municipio",
    __name__,
    url_prefix="/api"   )

@api_municipio.route("/municipios")
def dataMunicipios():
    try:
        region = request.args.get("region")

        if not region:
            return jsonify({"error": "Región no especificada"}), 400

        datos = MunicipioServices.obtener_por_region(region)
        return jsonify(datos or [])

    except Exception as e:
        return jsonify({
            "error": "Error interno del servidor",
            "detalle": str(e)
        }), 500

