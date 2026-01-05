import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUTA_JSON = os.path.join(BASE_DIR, "Storage", "json_storageRegiones.json")

def obtener_regiones():
    with open(RUTA_JSON, "r", encoding="utf-8") as f:
        return json.load(f)
