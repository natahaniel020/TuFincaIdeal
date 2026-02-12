import os
from flask import Flask, render_template
from flask_babel import Babel
# esta es la ruto donde esta el archivo blueprins.
from Blueprint.front.Routes import front_bp
from Blueprint.api.MunicipioRouter import api_municipio
from Blueprint.api.RegionRouter import api_regiones
from Blueprint.api.FincasRouter import api_fincas
from Blueprint.api.PerfilRouter import api_perfil

# crea la app y la enlasa a las dos carpetas prinvipales 
app = Flask(__name__,
            template_folder="UI/templates", 
            static_folder="UI/static"
            )

# Configuración de idiomas
app.config['BABEL_DEFAULT_LOCALE'] = 'es'
app.config['BABEL_SUPPORTED_LOCALES'] = ['es', 'en']

# Inicializar Babel
babel = Babel(app)

# Agrega  el Blueprint a la aplicación Flask

# El front blueprint solo sirve para entregar HTML
app.register_blueprint(front_bp)
app.register_blueprint(api_municipio, url_prefix="/api")
app.register_blueprint(api_regiones, url_prefix="/api")
app.register_blueprint(api_fincas, url_prefix="/api")
app.register_blueprint(api_perfil, url_prefix="/api")

# Entreha el HTML al nevegador
@app.route("/")
def home():
    return render_template("home.html")

# Ejecuta la aplicación Flask.
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

# http://127.0.0.1:5000

# http://127.0.0.1:5000/regiones

# http://localhost:5000/fincas

# http://127.0.0.1:5000/perfil?id=1




