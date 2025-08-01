// --- ANIMATION SCROLL + LOOKBOOK ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.categorie-item, .produit-card, .lookbook-scroll img')
    .forEach(el => observer.observe(el));
  
  // --- PANIER SIMPLE ---
  let panier = [];
  document.querySelectorAll('.produit-card button').forEach(button => {
    button.addEventListener('click', () => {
      const produitCard = button.closest('.produit-card');
      const nom = produitCard.querySelector('h3').textContent;
      const prix = produitCard.querySelector('.prix').textContent;
      panier.push({ nom, prix });
      alert(`${nom} ajouté au panier !`);
    });
  });
  
  document.getElementById('cart-btn').addEventListener('click', () => {
    if (panier.length === 0) {
      alert("Votre panier est vide !");
    } else {
      let message = "Panier :\n";
      panier.forEach((p, i) => message += `${i + 1}. ${p.nom} - ${p.prix}\n`);
      alert(message);
    }
  });
  
  // --- SCROLL SMOOTH (menu avec ancres) ---
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // --- Slider automatique Lookbook avec boutons ---
const lookbook = document.getElementById('lookbookSlider');
const lookLeft = document.getElementById('lookLeft');
const lookRight = document.getElementById('lookRight');
const cutSize = 250;
function lookbookAutoScroll() {
  if (lookbook.scrollLeft + lookbook.clientWidth >= lookbook.scrollWidth) {
    lookbook.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    lookbook.scrollBy({ left: cutSize, behavior: 'smooth' });
  }
}

let lookInterval = setInterval(lookbookAutoScroll, 3000);

lookLeft.addEventListener('click', () => {
  clearInterval(lookInterval);
  lookbook.scrollBy({ left: -cutSize, behavior: 'smooth' });
  lookInterval = setInterval(lookbookAutoScroll, 3000);
});
lookRight.addEventListener('click', () => {
  clearInterval(lookInterval);
  lookbook.scrollBy({ left: cutSize, behavior: 'smooth' });
  lookInterval = setInterval(lookbookAutoScroll, 3000);
});

  
  // --- SLIDER AUTOMATIQUE LOOKBOOK ---
  const slider = document.getElementById('lookbookSlider');
  let scrollAmount = 0;
  setInterval(() => {
    if (slider.scrollWidth - slider.clientWidth <= scrollAmount) {
      scrollAmount = 0; // revient au début
    } else {
      scrollAmount += cutSize; // largeur image + gap
    }
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 3000);
  


  