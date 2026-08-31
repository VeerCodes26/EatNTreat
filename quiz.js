/**
 * ============================================================================
 * EATNTREAT — AI BREED MATCHER QUIZ ENGINE
 * Gamified Step-by-Step Questionnaire • Temperament Matcher
 * ============================================================================
 */

window.quizAnswers = {};

window.selectQuizAnswer = function(step, val) {
  window.quizAnswers[step] = val;

  const curStepEl = document.getElementById(`quiz-step-${step}`);
  if (curStepEl) curStepEl.classList.remove('active');

  if (step < 3) {
    const nextStepEl = document.getElementById(`quiz-step-${step + 1}`);
    if (nextStepEl) nextStepEl.classList.add('active');
  } else {
    calculateQuizMatch();
  }
};

function calculateQuizMatch() {
  const resultStep = document.getElementById('quiz-result-step');
  const title = document.getElementById('quiz-match-title');
  const desc = document.getElementById('quiz-match-desc');
  const viewBtn = document.getElementById('btn-view-matched-puppies');

  let matchBreed = 'Golden Retriever';
  let matchDesc = 'The ultimate family companion! Loving, patient with children, and highly intelligent.';

  if (window.quizAnswers[3] === 'hypoallergenic' || window.quizAnswers[1] === 'apartment') {
    if (window.quizAnswers[2] === 'calm') {
      matchBreed = 'Shih-Tzu';
      matchDesc = 'Fluffy, gentle, non-shedding, and loves curling up on the sofa. Perfect for flats.';
    } else {
      matchBreed = 'Poodle';
      matchDesc = 'Brilliant, non-shedding Toy Poodle! Extremely smart, clean, and full of playful energy.';
    }
  } else if (window.quizAnswers[3] === 'guard_dog') {
    matchBreed = 'German Shepherd';
    matchDesc = 'Majestic, brave, and deeply loyal. An outstanding protector for independent houses.';
  } else if (window.quizAnswers[2] === 'high') {
    matchBreed = 'Siberian Husky';
    matchDesc = 'Spirited, active, and breathtakingly gorgeous. Loves jogging and outdoor adventures.';
  } else if (window.quizAnswers[1] === 'apartment') {
    matchBreed = 'Beagle';
    matchDesc = 'Compact, friendly, and affectionate with big expressive eyes and a curious personality.';
  } else {
    matchBreed = 'Labrador';
    matchDesc = 'India’s most beloved dog! Gentle, loyal, easy to train, and deeply devoted to your family.';
  }

  if (title) title.textContent = matchBreed;
  if (desc) desc.textContent = matchDesc;
  if (resultStep) resultStep.classList.add('active');

  if (viewBtn) {
    viewBtn.onclick = () => {
      filterByBreedName(matchBreed);
    };
  }

  if (typeof confetti === 'function') {
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  }
}

window.resetQuiz = function() {
  window.quizAnswers = {};
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  const firstStep = document.getElementById('quiz-step-1');
  if (firstStep) firstStep.classList.add('active');
};
