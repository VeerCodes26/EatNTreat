/**
 * ============================================================================
 * EATNTREAT — MAIN APPLICATION CONTROLLER
 * Global Initialization • Search Autocomplete • Location Switcher • Drawer
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initial Render of Directory
  if (typeof renderPuppiesGrid === 'function') {
    renderPuppiesGrid('all', '');
  }

  // 3. Directory Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab-pill');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;
      const searchVal = document.getElementById('global-pet-search')?.value || '';
      renderPuppiesGrid(cat, searchVal);
    });
  });

  // 4. Search Bar Live Filtering
  const globalSearchInput = document.getElementById('global-pet-search');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.filter-tab-pill.active')?.dataset.category || 'all';
      renderPuppiesGrid(activeTab, e.target.value);
    });
  }

  // 5. Expandable Search Bar Toggle
  const searchToggleBtn = document.getElementById('btn-search-modal-toggle');
  const searchExpandable = document.getElementById('gf-search-bar-expandable');
  const closeSearchBarBtn = document.getElementById('btn-close-search-bar');

  if (searchToggleBtn && searchExpandable) {
    searchToggleBtn.addEventListener('click', () => {
      searchExpandable.classList.toggle('active');
      if (searchExpandable.classList.contains('active') && globalSearchInput) {
        globalSearchInput.focus();
      }
    });
  }
  if (closeSearchBarBtn && searchExpandable) {
    closeSearchBarBtn.addEventListener('click', () => {
      searchExpandable.classList.remove('active');
    });
  }

  // 6. City Location Dropdown
  const locBtn = document.getElementById('location-btn');
  const locMenu = document.getElementById('location-menu');
  const locLabel = document.getElementById('current-city-label');

  if (locBtn && locMenu) {
    locBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      locMenu.classList.toggle('active');
    });

    const options = locMenu.querySelectorAll('.loc-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const city = opt.dataset.city;
        const tier = opt.dataset.tier;
        if (locLabel) locLabel.textContent = city;
        
        // Sync with grooming tier if changed
        if (tier && typeof window.updateGroomingPrices === 'function') {
          window.currentGroomingTier = tier;
          const tierBtns = document.querySelectorAll('.tier-btn');
          tierBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.tier === tier);
          });
          window.updateGroomingPrices();
        }
        
        locMenu.classList.remove('active');
      });
    });

    window.addEventListener('click', (e) => {
      if (!locMenu.contains(e.target) && e.target !== locBtn) {
        locMenu.classList.remove('active');
      }
    });
  }

  // 7. Mobile Navigation Drawer Controls
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const closeMobileNavBtn = document.getElementById('btn-close-mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mob-link');
  const mobileSearchInput = document.getElementById('mobile-pet-search');

  if (mobileMenuBtn && mobileNavBackdrop) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavBackdrop.classList.add('active');
    });
  }

  function closeMobileNav() {
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('active');
  }

  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileNavBackdrop) closeMobileNav();
    });
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.filter-tab-pill.active')?.dataset.category || 'all';
      renderPuppiesGrid(activeTab, e.target.value);
    });
  }

  // 8. Close Modal when clicking outside
  const petModal = document.getElementById('pet-details-modal');
  const closePetModalBtn = document.getElementById('btn-close-pet-modal');
  if (closePetModalBtn && petModal) {
    closePetModalBtn.addEventListener('click', () => {
      petModal.classList.remove('active');
    });
  }
  window.addEventListener('click', (e) => {
    if (e.target === petModal) petModal.classList.remove('active');
  });
});
