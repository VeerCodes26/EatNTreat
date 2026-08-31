/**
 * ============================================================================
 * EATNTREAT — PUPPIES DATABASE & DIRECTORY CONTROLLER
 * Live Puppy Listings • Health Certifications • Modal Details • Wishlist
 * ============================================================================
 */

// Global Puppies Database
window.puppiesData = [
  {
    id: 'pet-1',
    name: 'Snoopy',
    breed: 'Beagle',
    category: 'medium',
    gender: 'Male',
    age: '7 Weeks',
    price: 15000,
    priceFormatted: '₹15,000',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&auto=format&fit=crop&q=80',
    kci: true,
    location: 'Delhi NCR, Jaipur, Chandigarh',
    vacStatus: '1st DHPPIL Done',
    desc: 'Playful, gentle, and food-loving Beagle puppy. Microchipped with champion lineage.'
  },
  {
    id: 'pet-2',
    name: 'Bruno',
    breed: 'Labrador',
    category: 'large',
    gender: 'Male',
    age: '7 Weeks',
    price: 12000,
    priceFormatted: '₹12,000',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?w=600&auto=format&fit=crop&q=80',
    kci: true,
    location: 'All India Transit Available',
    vacStatus: '1st Dose Done',
    desc: 'Heavy-bone Golden Yellow Labrador with calm, obedient, kid-friendly temperament.'
  },
  {
    id: 'pet-3',
    name: 'Mochi',
    breed: 'Shih-Tzu',
    category: 'small',
    gender: 'Female',
    age: '7 Weeks',
    price: 18000,
    priceFormatted: '₹18,000',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=80',
    kci: false,
    location: 'Delhi NCR, Mumbai, Pune',
    vacStatus: '1st Dose & Dewormed',
    desc: 'Ultra-cute, non-shedding tri-color Shih-Tzu girl. Ideal for compact apartment living.'
  },
  {
    id: 'pet-4',
    name: 'Milo',
    breed: 'Golden Retriever',
    category: 'large',
    gender: 'Male',
    age: '8 Weeks',
    price: 22000,
    priceFormatted: '₹22,000',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&auto=format&fit=crop&q=80',
    kci: true,
    location: 'Delhi NCR, Jaipur, Chandigarh',
    vacStatus: '1st Dose Done',
    desc: 'Fluffy cream Golden Retriever with loving personality and imported bloodline.'
  },
  {
    id: 'pet-5',
    name: 'Rex',
    breed: 'Siberian Husky',
    category: 'large',
    gender: 'Male',
    age: '8 Weeks',
    price: 25000,
    priceFormatted: '₹25,000',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
    kci: true,
    location: 'Delhi NCR, Mumbai, Bangalore',
    vacStatus: '1st & 2nd Dose Done',
    desc: 'Stunning bi-eyed Siberian Husky with striking coat and energetic, vocal personality.'
  },
  {
    id: 'pet-6',
    name: 'Oscar',
    breed: 'Pug',
    category: 'small',
    gender: 'Male',
    age: '7 Weeks',
    price: 10000,
    priceFormatted: '₹10,000',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80',
    kci: false,
    location: 'Delhi NCR, Bangalore, Pune',
    vacStatus: '1st Dose & Dewormed',
    desc: 'Adorable fawn Pug puppy with gentle, low-maintenance indoor temperament.'
  },
  {
    id: 'pet-7',
    name: 'Rocky',
    breed: 'German Shepherd',
    category: 'large',
    gender: 'Male',
    age: '8 Weeks',
    price: 20000,
    priceFormatted: '₹20,000',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80',
    kci: true,
    location: 'Delhi NCR, Mumbai, Chandigarh',
    vacStatus: '1st Dose Done & Microchipped',
    desc: 'Heavy-coat, double-boned German Shepherd puppy with loyal guarding instincts.'
  },
  {
    id: 'pet-8',
    name: 'Bella',
    breed: 'Poodle',
    category: 'small',
    gender: 'Female',
    age: '8 Weeks',
    price: 35000,
    priceFormatted: '₹35,000',
    image: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?w=600&auto=format&fit=crop&q=80',
    kci: true,
    location: 'Delhi NCR, Bangalore, Mumbai',
    vacStatus: '1st Dose & Dewormed',
    desc: 'Hypoallergenic apricot Toy Poodle. Highly intelligent, eager to learn, and non-shedding.'
  }
];

// Wishlist Set
window.petWishlist = new Set();

window.toggleWishlist = function(petId, name) {
  const isWishlisted = window.petWishlist.has(petId);
  if (isWishlisted) {
    window.petWishlist.delete(petId);
    showToast(`Removed ${name} from your Wishlist`);
  } else {
    window.petWishlist.add(petId);
    showToast(`❤️ Added ${name} to your Wishlist!`);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  }
  const activeTab = document.querySelector('.filter-tab-pill.active')?.dataset.category || 'all';
  const searchVal = document.getElementById('global-pet-search')?.value || '';
  renderPuppiesGrid(activeTab, searchVal);
};

// Toast notification helper
function showToast(msg) {
  let toast = document.getElementById('goodfurs-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'goodfurs-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0A1118;
      color: #FFFFFF;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: 999px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      border: 1px solid rgba(255, 107, 0, 0.4);
      z-index: 9999;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:#FF6B00;">🐾</span> ${msg}`;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 2600);
}

// Render Puppy Cards (Luxury E-commerce Cards)
function renderPuppiesGrid(filterCategory = 'all', searchQuery = '') {
  const container = document.getElementById('puppies-list-grid');
  if (!container) return;

  container.innerHTML = '';

  const filtered = window.puppiesData.filter(pet => {
    const matchesCat = (filterCategory === 'all') || 
                       (filterCategory === 'kci' ? pet.kci : pet.category === filterCategory);
    const matchesSearch = !searchQuery || 
                          pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #64748B;">
        <i data-lucide="paw-print" style="width: 48px; height: 48px; margin-bottom: 12px; color: #FF6B00;"></i>
        <h3 style="font-family: var(--font-heading); color: #0A1118; font-size: 22px;">No puppies matched your search</h3>
        <p style="font-size: 14px;">Try searching for another breed like Beagle, Labrador, Husky, or Shih-Tzu.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  filtered.forEach(pet => {
    const isWishlisted = window.petWishlist.has(pet.id);
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <div class="pet-card-img-wrap">
        <img src="${pet.image}" alt="${pet.name} ${pet.breed}" class="pet-card-img">
        ${pet.kci ? `<span class="pet-kci-badge"><i data-lucide="award"></i> KCI Registered</span>` : ''}
        
        <div style="position: absolute; top: 12px; right: 12px; display: flex; gap: 6px;">
          <button class="share-pet-btn" style="${isWishlisted ? 'color: #EF4444; background: #FFFFFF;' : ''}" onclick="toggleWishlist('${pet.id}', '${pet.name}')" title="Save to Wishlist">
            <i data-lucide="heart" style="${isWishlisted ? 'fill: #EF4444;' : ''}"></i>
          </button>
          <button class="share-pet-btn" onclick="sharePet('${pet.name}', '${pet.breed}')" title="Share Pet">
            <i data-lucide="share-2"></i>
          </button>
        </div>
      </div>
      <div class="pet-card-body">
        <div class="pet-card-header">
          <h3 class="pet-card-name">${pet.name}</h3>
          <span class="pet-card-price">${pet.priceFormatted}</span>
        </div>
        <div class="pet-meta-row">
          <span class="meta-tag">${pet.breed}</span>
          <span>•</span>
          <span>${pet.gender}</span>
          <span>•</span>
          <span>${pet.age}</span>
        </div>
        <div class="pet-cert-strip">
          <span class="cert-pill purebred"><i data-lucide="shield-check"></i> Purebred</span>
          <span class="cert-pill health"><i data-lucide="check"></i> 100% Health Checked</span>
        </div>
        <div class="pet-location-row">
          <i data-lucide="map-pin"></i>
          <span>${pet.location}</span>
        </div>
        <div class="pet-card-footer">
          <button class="meet-pet-btn" onclick="openPetModal('${pet.id}')">
            <i data-lucide="eye"></i>
            <span>Meet ${pet.name} (Live Video)</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

// Global Breed Filter Helper
window.filterByBreedName = function(breedName) {
  const searchInput = document.getElementById('global-pet-search');
  if (searchInput) {
    searchInput.value = breedName;
    renderPuppiesGrid('all', breedName);
  }
  const section = document.getElementById('section-puppies');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
};

// Open Pet Profile Modal
window.openPetModal = function(petId) {
  const pet = window.puppiesData.find(p => p.id === petId);
  if (!pet) return;

  const modal = document.getElementById('pet-details-modal');
  document.getElementById('modal-pet-img').src = pet.image;
  document.getElementById('modal-pet-name').textContent = pet.name;
  document.getElementById('modal-pet-breed').textContent = `${pet.breed} • ${pet.gender} • ${pet.age}`;
  document.getElementById('modal-pet-price').textContent = pet.priceFormatted;
  document.getElementById('modal-pet-age').textContent = pet.age;
  document.getElementById('modal-pet-gender').textContent = pet.gender;
  document.getElementById('modal-pet-vac').textContent = pet.vacStatus;
  document.getElementById('modal-pet-loc').textContent = pet.location;

  const kciPill = document.getElementById('modal-kci-pill');
  if (kciPill) {
    kciPill.style.display = pet.kci ? 'flex' : 'none';
  }

  // Hook Book / Inquire Button
  const bookBtn = document.getElementById('btn-book-pet');
  if (bookBtn) {
    bookBtn.onclick = () => {
      const city = document.getElementById('current-city-label')?.textContent || 'India';
      const msg = encodeURIComponent(`Hi eatNtreat India! I am interested in adopting ${pet.name} (${pet.breed}, ${pet.priceFormatted}) in ${city}. Please share live video call & vaccination certificate details.`);
      window.open(`https://wa.me/918779692292?text=${msg}`, '_blank');
    };
  }

  if (modal) modal.classList.add('active');
};

// Share Pet
window.sharePet = function(name, breed) {
  if (navigator.share) {
    navigator.share({
      title: `Adopt ${name} (${breed}) on eatNtreat`,
      text: `Check out ${name}, a purebred healthy ${breed} puppy available on eatNtreat India!`,
      url: window.location.href
    }).catch(() => {});
  } else {
    showToast(`Link copied! Check out ${name} (${breed}) on eatNtreat.`);
  }
};
