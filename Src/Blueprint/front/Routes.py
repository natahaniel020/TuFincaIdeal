from flask import Blueprint, render_template

front_bp = Blueprint("front", __name__)

@front_bp.route("/municipios")
def municipios():
    return render_template("index.html")

@front_bp.route("/regiones")
def regiones():
    return render_template("index.html")

@front_bp.route("/fincas")
def fincas():
    return render_template("fincas.html")

@front_bp.route("/perfil")
def perfil():
    return render_template("perfil.html")
