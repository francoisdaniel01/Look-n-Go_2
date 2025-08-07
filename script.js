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
function showQuantity(button) {
    const btnGroup = button.parentElement;
    const quantityControls = btnGroup.querySelector('.quantity-controls');

    button.style.display = 'none';
    quantityControls.style.display = 'flex';
  }

  function increaseQty(btn) {
    const span = btn.parentElement.querySelector('span');
    let count = parseInt(span.innerText) + 1;
    span.innerText = count;

    updateCartFromCard(btn.closest('.product-card'), count);
  }

  function decreaseQty(btn) {
    const span = btn.parentElement.querySelector('span');
    let count = parseInt(span.innerText) - 1;

    if (count <= 0) {
      const quantityControls = btn.parentElement;
      const btnGroup = quantityControls.parentElement;
      quantityControls.style.display = 'none';
      btnGroup.querySelector('.btn').style.display = 'block';

      removeFromCart(btn.closest('.product-card'));
    } else {
      span.innerText = count;
      updateCartFromCard(btn.closest('.product-card'), count);
    }
  }

  // Met à jour la quantité d'un produit déjà dans le panier
  function updateCartFromCard(card, quantity) {
    const titre = card.querySelector(".product-title").innerText;
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    let produit = panier.find(p => p.titre === titre);
    if (produit) {
      produit.quantite = quantity;
    } else {
      const prixTexte = card.querySelector(".prix").innerText;
      const prix = parseInt(prixTexte.replace(/[^\d]/g, '')); // "29 900 FCFA" -> 29900
      const image = card.querySelector("img").getAttribute("src");

      panier.push({
        titre,
        prix,
        image,
        quantite: quantity
      });
    }
    localStorage.setItem("panier", JSON.stringify(panier));
  }

  // Supprime un produit du panier
  function removeFromCart(card) {
    const titre = card.querySelector(".product-title").innerText;
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier = panier.filter(p => p.titre !== titre);
    localStorage.setItem("panier", JSON.stringify(panier));
  }

  // Quand on clique sur "Ajouter au panier"
  document.querySelectorAll(".product-card").forEach(card => {
    const addButton = card.querySelector(".btn");
    const quantitySpan = card.querySelector(".quantity-controls span");

    addButton.addEventListener("click", () => {
      const titre = card.querySelector(".product-title").innerText;
      const prixTexte = card.querySelector(".prix").innerText;
      const prix = parseInt(prixTexte.replace(/[^\d]/g, '')); // ✅ conversion
      const image = card.querySelector("img").getAttribute("src");

      const produit = {
        titre,
        prix,
        image,
        quantite: parseInt(quantitySpan.innerText)
      };

      let panier = JSON.parse(localStorage.getItem("panier")) || [];

      // Vérifie si l'article existe déjà
      const index = panier.findIndex(p => p.titre === titre);
      if (index >= 0) {
        panier[index].quantite += produit.quantite;
      } else {
        panier.push(produit);
      }

      localStorage.setItem("panier", JSON.stringify(panier));
      alert("✅ Produit ajouté au panier !");
    });
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
  


  