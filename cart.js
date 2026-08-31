/**
 * ============================================================================
 * EATNTREAT — SHOPPING CART & TREATS STORE CONTROLLER
 * Mobile-First Cart Drawer • Item Counter • Instant WhatsApp Checkout
 * ============================================================================
 */

window.shopCart = [];

window.addToCart = function(name, price, image) {
  const existing = window.shopCart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    window.shopCart.push({ name, price, image, qty: 1 });
  }

  updateCartUI();

  const drawer = document.getElementById('cart-drawer-modal');
  if (drawer) drawer.classList.add('active');

  if (typeof confetti === 'function') {
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  }
};

window.removeFromCart = function(index) {
  window.shopCart.splice(index, 1);
  updateCartUI();
};

function updateCartUI() {
  const container = document.getElementById('cart-items-container');
  const countBadge = document.getElementById('cart-item-count');
  const totalVal = document.getElementById('cart-total-val');

  let totalItems = 0;
  let totalPrice = 0;

  window.shopCart.forEach(i => {
    totalItems += i.qty;
    totalPrice += i.price * i.qty;
  });

  if (countBadge) countBadge.textContent = totalItems;
  if (totalVal) totalVal.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;

  if (container) {
    if (window.shopCart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-text">
          <i data-lucide="shopping-bag"></i>
          <p>Your treats & care bag is empty.</p>
          <span>Select gourmet treats or puppy food to begin!</span>
        </div>
      `;
    } else {
      container.innerHTML = '';
      window.shopCart.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info" style="flex: 1;">
            <h5>${item.name}</h5>
            <span class="cart-item-p">₹${item.price.toLocaleString('en-IN')} × ${item.qty}</span>
          </div>
          <button style="background:transparent; border:none; color:#94A3B8; cursor:pointer; padding:6px;" onclick="removeFromCart(${idx})" title="Remove">
            <i data-lucide="trash-2"></i>
          </button>
        `;
        container.appendChild(row);
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }
}

// Cart Drawer Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const cartToggleBtn = document.getElementById('btn-cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer-modal');
  const closeCartBtn = document.getElementById('btn-close-cart');
  const checkoutBtn = document.getElementById('btn-checkout');

  if (cartToggleBtn && cartDrawer) {
    cartToggleBtn.addEventListener('click', () => {
      cartDrawer.classList.add('active');
    });
  }
  if (closeCartBtn && cartDrawer) {
    closeCartBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('active');
    });
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (window.shopCart.length === 0) {
        showToast("Your cart is empty. Please add treats or accessories.");
        return;
      }
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      
      const city = document.getElementById('current-city-label')?.textContent || 'India';
      const itemsList = window.shopCart.map(i => `${i.name} (x${i.qty}) - ₹${(i.price * i.qty).toLocaleString('en-IN')}`).join(', ');
      const total = window.shopCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      
      const msg = encodeURIComponent(`Hi eatNtreat India! I want to place an order for: ${itemsList}. Total: ₹${total.toLocaleString('en-IN')} in ${city}. Please share delivery timeframe.`);
      window.open(`https://wa.me/918779692292?text=${msg}`, '_blank');
      
      window.shopCart = [];
      updateCartUI();
      if (cartDrawer) cartDrawer.classList.remove('active');
    });
  }
});
