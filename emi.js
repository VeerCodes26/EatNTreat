/**
 * ============================================================================
 * EATNTREAT — PUPPY EMI CALCULATOR
 * 0% Downpayment • Real-Time Monthly Calculation • WhatsApp Application
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const emiSlider = document.getElementById('emi-budget-slider');
  const emiBudgetDisplay = document.getElementById('emi-budget-display');
  const emiMonthlyAmount = document.getElementById('emi-monthly-amount');
  const tenurePills = document.querySelectorAll('.tenure-pill');
  const applyEmiBtn = document.getElementById('btn-apply-emi');

  let selectedTenure = 6;

  function updateEmiCalculation() {
    if (!emiSlider) return;
    const budget = parseInt(emiSlider.value, 10);
    if (emiBudgetDisplay) {
      emiBudgetDisplay.textContent = `₹${budget.toLocaleString('en-IN')}`;
    }
    const monthlyEmi = Math.round(budget / selectedTenure);
    if (emiMonthlyAmount) {
      emiMonthlyAmount.textContent = `₹${monthlyEmi.toLocaleString('en-IN')} / month`;
    }
  }

  if (emiSlider) {
    emiSlider.addEventListener('input', updateEmiCalculation);
  }

  tenurePills.forEach(pill => {
    pill.addEventListener('click', () => {
      tenurePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedTenure = parseInt(pill.dataset.months, 10);
      updateEmiCalculation();
    });
  });

  if (applyEmiBtn) {
    applyEmiBtn.addEventListener('click', () => {
      const budget = emiSlider ? parseInt(emiSlider.value, 10) : 20000;
      const monthlyEmi = Math.round(budget / selectedTenure);
      const city = document.getElementById('current-city-label')?.textContent || 'India';
      const msg = encodeURIComponent(`Hi eatNtreat India! I want to apply for 0% Downpayment Puppy EMI for a budget of ₹${budget.toLocaleString('en-IN')} over ${selectedTenure} months (~₹${monthlyEmi.toLocaleString('en-IN')}/mo) in ${city}. Please guide me on approval.`);
      window.open(`https://wa.me/918779692292?text=${msg}`, '_blank');
    });
  }

  updateEmiCalculation();
});
