/**
 * ============================================================================
 * EATNTREAT — DYNAMIC PET GROOMING CALCULATOR ENGINE
 * Doorstep Salon Van Rates by City, Town & Village Area Tiers
 * ============================================================================
 */

window.currentGroomingTier = 'city'; // 'city' | 'town' | 'village'
window.currentPetSize = 'small';     // 'small' | 'medium' | 'large' | 'cat'

window.tierMultipliers = {
  city: 1.0,     // Metro cities (standard base)
  town: 0.85,    // Tier-2 / Towns (~15% discount)
  village: 0.75  // Rural / Village camps (~25% discount)
};

window.sizeMultipliers = {
  small: 1.0,    // 0-10 kg
  medium: 1.25,  // 10-25 kg
  large: 1.5,    // 25+ kg
  cat: 0.95      // Cat / Kitten
};

window.updateGroomingPrices = function() {
  const tierMult = window.tierMultipliers[window.currentGroomingTier] || 1.0;
  const sizeMult = window.sizeMultipliers[window.currentPetSize] || 1.0;

  const baseBath = 799;
  const baseStyling = 1499;
  const baseDeshedding = 1899;

  const finalBath = Math.round(baseBath * tierMult * sizeMult);
  const finalStyling = Math.round(baseStyling * tierMult * sizeMult);
  const finalDeshedding = Math.round(baseDeshedding * tierMult * sizeMult);

  const elBath = document.getElementById('price-bath');
  const elStyling = document.getElementById('price-styling');
  const elDeshedding = document.getElementById('price-deshedding');

  if (elBath) elBath.textContent = `₹${finalBath.toLocaleString('en-IN')}`;
  if (elStyling) elStyling.textContent = `₹${finalStyling.toLocaleString('en-IN')}`;
  if (elDeshedding) elDeshedding.textContent = `₹${finalDeshedding.toLocaleString('en-IN')}`;
};

// Book Grooming Package on WhatsApp
window.bookGrooming = function(packageName) {
  const tierName = window.currentGroomingTier === 'city' ? 'Metro City' : (window.currentGroomingTier === 'town' ? 'Town/Tier-2' : 'Village/Rural');
  const sizeName = window.currentPetSize === 'cat' ? 'Cat/Kitten' : `${window.currentPetSize.toUpperCase()} Dog`;
  let priceText = '₹1,499';
  if (packageName.includes('Hydro-Bath')) priceText = document.getElementById('price-bath')?.textContent || '₹799';
  if (packageName.includes('Styling')) priceText = document.getElementById('price-styling')?.textContent || '₹1,499';
  if (packageName.includes('De-Shedding')) priceText = document.getElementById('price-deshedding')?.textContent || '₹1,899';

  const cityLabel = document.getElementById('current-city-label')?.textContent || 'India';
  const msg = encodeURIComponent(`Hi eatNtreat India! I want to book a Doorstep Grooming Van for "${packageName}" (${sizeName}, ${tierName} Rate: ${priceText}) in ${cityLabel}. Please confirm slot availability.`);
  window.open(`https://wa.me/918779692292?text=${msg}`, '_blank');
};

// Grooming Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const tierButtons = document.querySelectorAll('.tier-btn');
  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tierButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.currentGroomingTier = btn.dataset.tier;
      window.updateGroomingPrices();
    });
  });

  const sizePills = document.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      window.currentPetSize = pill.dataset.size;
      window.updateGroomingPrices();
    });
  });

  window.updateGroomingPrices();
});
