// --- Gestion Panier (localStorage déjà existant) ---
function getPanier(){ return JSON.parse(localStorage.getItem("panier")) || []; }
function setPanier(panier){ localStorage.setItem("panier", JSON.stringify(panier)); }

function afficherPanier(){
  const panier = getPanier();
  const container = document.getElementById("panier-container");
  container.innerHTML = '';
  if(panier.length === 0){ container.innerHTML = '<p class="empty-message">Votre panier est vide.</p>'; return; }

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Sous-total</th><th>Action</th></tr>`;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  let total = 0;
  panier.forEach((p,i)=>{
    let sousTotal = p.prix * p.quantite; total += sousTotal;
    tbody.innerHTML += `
      <tr>
        <td><img class="product-img" src="${p.image}" alt="${p.titre}"> ${p.titre}</td>
        <td>${p.prix.toLocaleString()} F CFA</td>
        <td>
          <div class="qty-controls">
            <button onclick="modifierQuantite(${i},-1)">-</button>
            ${p.quantite}
            <button onclick="modifierQuantite(${i},1)">+</button>
          </div>
        </td>
        <td>${sousTotal.toLocaleString()} F CFA</td>
        <td><button class="remove-btn" onclick="supprimerProduit(${i})">Supprimer</button></td>
      </tr>`;
  });
  table.appendChild(tbody);

  table.innerHTML += `<tfoot><tr class="total-row"><td colspan="3">Total</td><td colspan="2">${total.toLocaleString()} F CFA</td></tr></tfoot>`;
  container.appendChild(table);
}

function modifierQuantite(i,d){ let p=getPanier(); p[i].quantite+=d; if(p[i].quantite<=0) p.splice(i,1); setPanier(p); afficherPanier(); }
function supprimerProduit(i){ let p=getPanier(); p.splice(i,1); setPanier(p); afficherPanier(); }

// --- Paiement Modal ---
const modal=document.getElementById("paymentModal");
const btn=document.getElementById("btn-valider");
const close=document.querySelector(".close");

btn.onclick=()=>{ if(getPanier().length===0){ alert("Votre panier est vide"); } else { modal.style.display="flex"; } };
close.onclick=()=> modal.style.display="none";
window.onclick=(e)=>{ if(e.target===modal) modal.style.display="none"; };

// Gestion affichage des champs selon la méthode
const radiosMethode = document.querySelectorAll("input[name='methode']");
const paiementCarte = document.getElementById("paiement-carte");
const paiementMobile = document.getElementById("paiement-mobile");

radiosMethode.forEach(radio => {
  radio.addEventListener("change", () => {
    paiementCarte.style.display = "none";
    paiementMobile.style.display = "none";

    if (radio.value === "carte") {
      paiementCarte.style.display = "block";
    } else if (["mtn", "moov", "orange", "wave"].includes(radio.value)) {
      paiementMobile.style.display = "block";
    }
  });
});


// Simulation validation paiement
document.getElementById("formPaiement").addEventListener("submit", e=>{
  e.preventDefault();
  const methode = selectMethode.value;
  if (!methode) {
    alert("Veuillez sélectionner une méthode de paiement !");
    return;
  }
  alert(`✅ Paiement validé via ${methode.toUpperCase()}. Merci pour votre achat !`);
  localStorage.removeItem("panier");
  modal.style.display="none";
  afficherPanier();
});

document.getElementById("btn-supprimer").onclick=()=>{ localStorage.removeItem("panier"); afficherPanier(); };

document.getElementById("formPaiement").addEventListener("submit", e => {
  e.preventDefault();

  // Récupère méthode de paiement choisie
  const methode = document.querySelector("input[name='methode']:checked");
  if (!methode) {
    alert("⚠️ Veuillez choisir une méthode de paiement !");
    return;
  }

  const panier = getPanier();
  let total = panier.reduce((s, p) => s + p.prix * p.quantite, 0);

  // Générer numéro transaction aléatoire
  const transactionId = "TX-" + Math.floor(Math.random() * 100000000);

  // Remplir le reçu
  document.getElementById("receipt-details").innerHTML = `
    <p><strong>Transaction :</strong> ${transactionId}</p>
    <p><strong>Méthode :</strong> ${methode.value.toUpperCase()}</p>
    <p><strong>Total :</strong> ${total.toLocaleString()} F CFA</p>
    <p><strong>Statut :</strong> ✅ Paiement validé</p>
    <p>Merci pour votre achat chez <strong>Look’n’Go</strong> 👟</p>
  `;

  // Vider panier
  localStorage.removeItem("panier");
  afficherPanier();

  // Fermer modal paiement et ouvrir reçu
  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("receiptModal").style.display = "flex";
});

// Fermer reçu
document.getElementById("closeReceipt").onclick = () =>
  document.getElementById("receiptModal").style.display = "none";


afficherPanier();

