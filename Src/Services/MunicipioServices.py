import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUTA_JSON = os.path.join(BASE_DIR, "Storage", "json_storageMunicipios.json")


# Ruta al archivo JSON
ruta = "Storage/json_storageMunicipios.json"

# Abrir y cargar datos
def obtener_por_region(region):
    with open(RUTA_JSON, "r", encoding="utf-8") as f:
        datos = json.load(f)
    if region:  # filtrar si se recibe parámetro
        datos = [m for m in datos if m["region"] == region]
    return datos

