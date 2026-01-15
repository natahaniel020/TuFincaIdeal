// ---------------------------
// Variables globales
// ---------------------------
let currentLang = "es";
let regionActual = "Norte";
let municipios = [];
let swiper = null;

const encabezado = document.getElementById("encabezado");
const wrapper = document.querySelector(".swiper-wrapper");

// ---------------------------
// Inicializar Swiper
// ---------------------------
function initSwiper() {
  if (swiper) swiper.destroy(true, true);

  const usarLoop = municipios.length >= 3;

  swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: usarLoop, // 👈 clave
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
    autoplay: usarLoop
      ? {
          delay: 4500,
          disableOnInteraction: false,
        }
      : false,
    on: {
      slideChange() {
        if (!municipios.length) return;
        const index = this.realIndex ?? this.activeIndex;
        const item = municipios[index];
        if (item) encabezado.textContent = item.nombre;
      }
    }
  });
}


// ---------------------------
// Cargar regiones desde Home
// ---------------------------
function cargarRegionesDesdeHome() {
  fetch("/api/regiones")
    .then(res => res.json())
    .then(data => {
      municipios = data;
      wrapper.innerHTML = "";

      if (!data.length) {
        wrapper.innerHTML = "<p class='text-white text-center'>No hay regiones</p>";
        encabezado.textContent = "Sin regiones";
        return;
      }

      data.forEach(renderMunicipio);
      initSwiper();
      encabezado.textContent = "Regiones";
    })
    .catch(err => {
      console.error("Error al cargar regiones:", err);
      wrapper.innerHTML = "<p class='text-red-400 text-center'>Error al cargar regiones</p>";
    });
}

// ---------------------------
// Cargar municipios
// ---------------------------
function cargarMunicipios(region) {
  regionActual = region;

  fetch(`/api/municipios?region=${region}`)
    .then(res => res.json())
    .then(data => {
      municipios = data;
      wrapper.innerHTML = "";

      if (!data.length) {
        wrapper.innerHTML = "<p class='text-white text-center'>No hay municipios</p>";
        encabezado.textContent = "Sin municipios";
        return;
      }

      data.forEach(renderMunicipio);
      initSwiper();
      encabezado.textContent = data[0].nombre;
    })
    .catch(err => {
      console.error(err);
      wrapper.innerHTML = "<p class='text-red-400 text-center'>Error al cargar datos</p>";
    });
}

// ---------------------------
// Render tarjeta
// ---------------------------
function renderMunicipio(item) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide rounded-[2rem] overflow-hidden";

  let destino = "";

  if (window.location.pathname.includes("regiones")) {
    destino = `/municipios?region=${item.nombre}`;
  } else {
    destino = `/fincas?municipio=${item.nombre}`;
  }

  slide.innerHTML = `
    <img src="${item.imagen}" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-black/40 flex flex-col justify-end items-center text-center p-8">
      <p class="text-gray-200 text-sm mb-6">
        ${item.descripcion}
      </p>
      <button
        onclick="window.location.href='${destino}'"
        class="group relative bg-gradient-to-r from-[#8adf4f] to-[#6fb53f] 
        text-[#0c0f09] font-bold font-['Roboto'] text-lg 
        px-10 py-5 rounded-full 
        shadow-[0_10px_30px_rgba(138,223,79,0.4)] 
        border-2 border-[#A5EC60] 
        hover:shadow-[0_15px_40px_rgba(138,223,79,0.6)] 
        hover:scale-105 hover:-translate-y-1
        transition-all duration-300 ease-out 
        overflow-hidden">
        Descubre tu finca ideal.
      </button>
    </div>
  `;

  wrapper.appendChild(slide);
}

// ---------------------------
// Inicialización general
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  const ruta = window.location.pathname;

  // Cargar municipios si la URL incluye "municipios"
  if (ruta.includes("municipios")) {
    const params = new URLSearchParams(window.location.search);
    const region = params.get("region");

    if (region) {
      cargarMunicipios(region);
    } else {
      console.warn("No se recibió región en la URL");
    }
  }

  // Cargar regiones si la URL incluye "regiones"
  if (ruta.includes("regiones")) {
    cargarRegionesDesdeHome();
  }
  }
);
