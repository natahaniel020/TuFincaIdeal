const contenedorFincas = document.getElementById("contenedor-fincas");

function cargarFincas(municipio = null) {
  let url = "/api/fincas";
  if (municipio) url += `?municipio=${encodeURIComponent(municipio)}`;

  fetch(url)  
    .then(res => res.json())
    .then(data => {
      contenedorFincas.innerHTML = "";

      if (!data || data.length === 0) {
        contenedorFincas.innerHTML = "<p>No hay fincas disponibles</p>";
        return;
      }

      data.forEach(renderFinca);
    })
    .catch(err => console.error("Error al cargar fincas:", err));
}

// Función para formatear el precio (si no la tienes)
function formatearPrecio(precio) {
  if (!precio) return "0";
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(precio);
}

// Función para renderizar cada finca
function renderFinca(finca) {
  const tarjeta = document.createElement("div");
  tarjeta.className =
    "relative h-64 rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl";

  // Redirección al detalle
  tarjeta.onclick = () => {
    window.location.href = `/perfil?id=${finca.id}`;
  };

  tarjeta.innerHTML = `
    <img 
      src="${finca.imagen || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'}"
      class="w-full h-full object-cover"
      alt="${finca.nombre}"
    >

    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

    <!-- Precio en esquina superior derecha -->
    <div class="absolute top-4 right-4 bg-[#8adf4f]/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
      <p class="text-[#0c0f09] font-bold text-sm">
        $${formatearPrecio(finca.precio)}
      </p>
    </div>

    <!-- Información inferior -->
    <div class="absolute bottom-6 left-6 right-6">
      <h3 class="text-2xl font-bold text-white mb-2" style="font-family: 'Merriweather', serif;">
        ${finca.nombre}
      </h3>
      
      <!-- Número de personas con icono -->
      <div class="flex items-center space-x-2">
        <span class="material-symbols-outlined text-[#A5EC60] text-xl">group</span>
        <p class="text-sm text-[#A5EC60] font-semibold">
          ${finca.capacidad_personas || finca.personas || 'N/A'} personas
        </p>
      </div>
    </div>
  `;

  contenedorFincas.appendChild(tarjeta);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const municipio = params.get("municipio");
  cargarFincas(municipio);
});

