/**
 * ============================================================================
 * EATNTREAT — AUTHENTICATION & USER PROFILE CONTROLLER
 * Sign In Modal • Registration Toggle • Google Login • Seller Onboarding
 * ============================================================================
 */

window.isRegisterMode = false;

window.openAuthModal = function() {
  const authModal = document.getElementById('auth-signin-modal');
  if (authModal) authModal.classList.add('active');
};

window.closeAuthModal = function() {
  const authModal = document.getElementById('auth-signin-modal');
  if (authModal) authModal.classList.remove('active');
};

window.toggleAuthMode = function() {
  window.isRegisterMode = !window.isRegisterMode;
  const title = document.getElementById('auth-modal-title');
  const subtitle = document.getElementById('auth-modal-subtitle');
  const submitBtn = document.getElementById('btn-auth-submit');
  const switchText = document.getElementById('auth-switch-text');
  const switchLink = document.getElementById('auth-switch-link');

  if (window.isRegisterMode) {
    if (title) title.textContent = 'Register';
    if (subtitle) subtitle.textContent = 'Create your eatNtreat account in seconds';
    if (submitBtn) submitBtn.textContent = 'Create Account';
    if (switchText) switchText.textContent = 'Already have an account?';
    if (switchLink) switchLink.textContent = 'Sign In';
  } else {
    if (title) title.textContent = 'Sign In';
    if (subtitle) subtitle.textContent = 'Get started with eatNtreat now by signing in';
    if (submitBtn) submitBtn.textContent = 'Sign In';
    if (switchText) switchText.textContent = "Don't have an account?";
    if (switchLink) switchLink.textContent = 'Register Now';
  }
};

window.handleAuthSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email')?.value || 'Pet Parent';
  const action = window.isRegisterMode ? 'Account created successfully!' : 'Signed in successfully!';
  showToast(`🎉 Welcome to eatNtreat! ${action}`);
  if (typeof confetti === 'function') {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  }
  window.closeAuthModal();
  const openAuthBtn = document.getElementById('btn-open-auth-modal');
  if (openAuthBtn) {
    openAuthBtn.style.background = '#ECFDF5';
    openAuthBtn.style.borderColor = '#10B981';
    openAuthBtn.style.color = '#10B981';
  }
};

window.handleGoogleSignIn = function() {
  showToast('✨ Signed in with Google! Welcome to eatNtreat.');
  if (typeof confetti === 'function') {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  }
  window.closeAuthModal();
  const openAuthBtn = document.getElementById('btn-open-auth-modal');
  if (openAuthBtn) {
    openAuthBtn.style.background = '#ECFDF5';
    openAuthBtn.style.borderColor = '#10B981';
    openAuthBtn.style.color = '#10B981';
  }
};

window.handleForgotPassword = function() {
  const email = document.getElementById('auth-email')?.value;
  if (email) {
    showToast(`Password reset link sent to ${email}`);
  } else {
    showToast('Please enter your email above to reset password.');
  }
};

// Sell a Pet Helper
window.openSellPetModal = function() {
  const city = document.getElementById('current-city-label')?.textContent || 'India';
  const msg = encodeURIComponent(`Hi eatNtreat India! I am a verified ethical breeder / pet parent in ${city} and want to list puppies for sale on eatNtreat. Please share the breeder registration process.`);
  window.open(`https://wa.me/918779692292?text=${msg}`, '_blank');
};

// Modal Listeners
document.addEventListener('DOMContentLoaded', () => {
  const authModal = document.getElementById('auth-signin-modal');
  const openAuthBtn = document.getElementById('btn-open-auth-modal');
  const closeAuthBtn = document.getElementById('btn-close-auth-modal');

  if (openAuthBtn) openAuthBtn.addEventListener('click', window.openAuthModal);
  if (closeAuthBtn) closeAuthBtn.addEventListener('click', window.closeAuthModal);
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) window.closeAuthModal();
    });
  }
});
