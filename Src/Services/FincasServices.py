import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUTA_JSON = os.path.join(BASE_DIR, "Storage", "json_storageFincas.json")


# Abrir y cargar datos
def obtener_por_Municipio(municipio):
    with open(RUTA_JSON, "r", encoding="utf-8") as f:
        datos = json.load(f)

    if municipio:
        municipio = municipio.strip().lower()
        datos = [
            m for m in datos
            if m["municipio"].strip().lower() == municipio
        ]

    return datos

