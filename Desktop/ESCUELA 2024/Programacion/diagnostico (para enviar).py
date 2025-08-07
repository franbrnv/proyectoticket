# Definir diccionario con los precios y recargos por provincia
precios_provincias = {
    "Santa Cruz": {"precio": 320, "recargo_seguro": 0.10, "descuento": 0.06},
    "Chubut": {"precio": 280, "recargo_seguro": 0.15, "descuento": 0.05},
    "Rio Negro": {"precio": 300, "recargo_seguro": 0.20, "descuento": 0.10},
    "Tierra del Fuego": {"precio": 150, "recargo_seguro": 0.05, "descuento": 0.03}
}

def calcular_precio(provincia, cantidad_paquetes):
    if provincia in precios_provincias:
        precio_base = precios_provincias[provincia]["precio"] * cantidad_paquetes
        recargo_seguro = precio_base * precios_provincias[provincia]["recargo_seguro"]
        precio_final = precio_base + recargo_seguro
        if cantidad_paquetes > 3:
            descuento = precio_base * precios_provincias[provincia]["descuento"]
            precio_final -= descuento
        return precio_final
    else:
        return "Provincia no válida"

provincia_elegida = "Santa Cruz"
cantidad_paquetes = 4
precio_total = calcular_precio(provincia_elegida, cantidad_paquetes)
print(f"El precio total del envío a {provincia_elegida} para {cantidad_paquetes} paquetes es: ${precio_total}")
