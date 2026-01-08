const translations = {
  es: {
    fincaNature: "🌿 Finca",
    gallery: "Galería",
    pricePerNight: "Precio por noche",
    capacity: "👥 Capacidad",
    people: "Personas",
    features: "🌳 Características",
    location: "📍 Ubicación",
    description: "Descripción",
    footer: "© 2025 MiFincaIdeal. Todos los derechos reservados."
  },
  en: {
    fincaNature: "🌿 Farm",
    gallery: "Gallery",
    pricePerNight: "Price per night",
    capacity: "👥 Capacity",
    people: "People",
    features: "🌳 Features",
    location: "📍 Location",
    description: "Description",
    footer: "© 2025 MiFincaIdeal. All rights reserved."
  }
};
function applyLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.dataset.lang;
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function changeLanguage() {
  const current = localStorage.getItem("lang") || "es";
  const next = current === "es" ? "en" : "es";
  localStorage.setItem("lang", next);
  applyLanguage(next);
}

document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // SELECTORES SEGUROS
  // ===============================
  const fincaNameElement = document.querySelector('[data-lang="fincaNature"]');
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const miniCarousel = document.querySelector('.mini-carousel-container');
  const imageModal = document.getElementById("imageModal");

  const modalImage = document.getElementById("modalImage");

  const imageCounter = document.getElementById("imageCounter");
  const priceElement = document.querySelector('[data-lang="pricePerNight"] + p');
  const capacityElement = document.querySelector('[data-lang="capacity"] + p');
  const featuresList = document.querySelector('[data-lang-list="features"]');
  const locationElement = document.querySelector('[data-lang="locationText"]');
  const descriptionElement = document.querySelector('[data-lang="descriptionText"]');
  
  // ===============================
  // CARGAR PERFIL
  // ===============================
  function cargarPerfil() {
    const params = new URLSearchParams(window.location.search);
    const fincaId = params.get('id');

    if (!fincaId) {
      alert('No se especificó una finca');
      window.location.href = '/';
      return;
    }

    fetch(`/api/perfil?perfil=${fincaId}`)
      .then(res => {
        if (!res.ok) throw new Error('Finca no encontrada');
        return res.json();
      })
      .then(finca => renderPerfilFinca(finca))
      .catch(err => {
        console.error('Error cargando finca:', err);
        alert('Error al cargar la finca');
        window.location.href = '/';
      });
  }

  // ===============================
  // RENDER PERFIL
  // ===============================
  function renderPerfilFinca(finca) {

    if (swiperWrapper) {
      swiperWrapper.innerHTML = finca.fotosPrincipales.map(foto => `
        <div class="swiper-slide">
          <img src="${foto.src}" class="w-full h-full object-cover" alt="${foto.alt || ''}">
        </div>
      `).join('');
    }

    window.swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });

    if (miniCarousel) {
      miniCarousel.innerHTML = finca.fotosGallery.map(foto => `
        <img src="${foto.src}"
             class="w-20 h-20 rounded-xl cursor-pointer hover:opacity-80"
             onclick="expandImage(this)">
      `).join('');
    }

    if (priceElement) priceElement.textContent = `${finca.moneda} ${finca.precioPorNoche}`;
    if (capacityElement) capacityElement.textContent = `${finca.capacidad} personas`;
    if (locationElement) locationElement.textContent = `${finca.ubicacion.ciudad}, ${finca.ubicacion.departamento}`;
    if (descriptionElement) descriptionElement.textContent = finca.descripcion;
    if (fincaNameElement) fincaNameElement.textContent = `🌿 ${finca.nombre}`;

    if (featuresList && Array.isArray(finca.caracteristicas)) {
      featuresList.innerHTML = finca.caracteristicas
        .map(c => `<li>✓ ${c}</li>`)
        .join('');
    }
      window.galleryImages = finca.fotosGallery.map(f => f.src);

    if (window.swiper) window.swiper.update();
  }

  // ===============================
  // MODAL
  // ===============================
  window.expandImage = function (img) {
    window.currentImageIndex = window.galleryImages.indexOf(img.src);
    modalImage.src = img.src;
    imageCounter.textContent = `${window.currentImageIndex + 1} / ${window.galleryImages.length}`;
    imageModal.classList.remove("hidden");
  };

  window.closeModal = () => imageModal.classList.add("hidden");

  window.previousImage = () => {
    window.currentImageIndex =
      (window.currentImageIndex - 1 + window.galleryImages.length) % window.galleryImages.length;
    modalImage.src = window.galleryImages[window.currentImageIndex];
    imageCounter.textContent = `${window.currentImageIndex + 1} / ${window.galleryImages.length}`;
  };

  window.nextImage = () => {
    window.currentImageIndex =
      (window.currentImageIndex + 1) % window.galleryImages.length;
    modalImage.src = window.galleryImages[window.currentImageIndex];
    imageCounter.textContent = `${window.currentImageIndex + 1} / ${window.galleryImages.length}`;
  };
  // ===============================
  // INIT
  // ===============================
  

  cargarPerfil();
});


