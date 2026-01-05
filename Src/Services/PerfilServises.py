import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RUTA_JSON = os.path.join(BASE_DIR, "..", "Storage", "json_storagePerfil.json")

def obtener_finca_por_id(finca_id):
    with open(RUTA_JSON, "r", encoding="utf-8") as f:
        datos = json.load(f)

    return datos.get(str(finca_id))



