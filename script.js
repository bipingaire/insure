const form = document.getElementById('quoteForm');
const quoteResult = document.getElementById('quoteResult');
const modal = document.getElementById('quoteModal');
const openers = document.querySelectorAll('[data-open-quote]');
const chatOpeners = document.querySelectorAll('[data-open-chat]');
const closers = modal.querySelectorAll('[data-close]');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressStep = document.getElementById('progressStep');
const progressHint = document.getElementById('progressHint');
const steps = Array.from(document.querySelectorAll('.step'));
let currentStep = 0;

// TODO: replace with your real lead intake webhook/endpoint.
const LEAD_ENDPOINT = 'https://insure.supertruck.ai/api/leads';

const bandFactor = {
  elite: 0.82,
  preferred: 0.95,
  standard: 1.15,
  watchlist: 1.35
};

openers.forEach((btn) => btn.addEventListener('click', openModal));
chatOpeners.forEach((btn) => btn.addEventListener('click', openChat));
closers.forEach((btn) => btn.addEventListener('click', closeModal));
modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__overlay')) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

backBtn.addEventListener('click', () => moveStep(-1));
nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    if (!validateStep(steps[currentStep])) return;
    moveStep(1);
  } else {
    form.requestSubmit();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  setSubmitting(true);

  const data = new FormData(form);
  const trucks = Number(data.get('trucks')) || 1;
  const cdlBand = data.get('cdlBand');
  const policies = data.getAll('policy');
  const states = (data.get('states') || '').toUpperCase();
  const lossRuns = (data.get('lossRuns') || '').trim();
  const consent = data.get('consent') === 'on';
  const timeline = data.get('timeline') || 'asap';

  const base = 750;
  const perTruck = 140 * trucks;
  const band = bandFactor[cdlBand] ?? 1.2;

  let stateAdj = 1.0;
  if (states.includes('CA') || states.includes('NY') || states.includes('NJ')) stateAdj += 0.08;
  if (states.includes('TX') || states.includes('OK')) stateAdj -= 0.03;

  let lossAdj = 0;
  if (!lossRuns && consent) lossAdj += 35;
  if (lossRuns.toLowerCase().includes('recent')) lossAdj += 120;

  const estimated = (base + perTruck + lossAdj) * band * stateAdj;
  const low = Math.max(estimated * 0.92, 350);
  const high = estimated * 1.12;

  const headline = `Estimated monthly premium: $${Math.round(low)} - $${Math.round(high)}`;
  const summary = [
    `${trucks} power unit${trucks > 1 ? 's' : ''}`,
    `CDL band: ${bandLabel(cdlBand)}`,
    policies.length ? `Policies: ${policies.join(', ')}` : 'Policies: Auto liability focus',
    states ? `Lanes: ${states}` : null,
    consent ? 'Consent to pull loss runs' : 'Loss runs provided'
  ].filter(Boolean);

  const nextStep = timeline === 'asap'
    ? 'We will prioritize same-day binding.'
    : timeline === 'week'
      ? 'Expect bindable terms within a week for clean files.'
      : 'We will prepare options and hold until you are ready.';

  quoteResult.innerHTML = `
    <h3>${headline}</h3>
    <p class="lede">Live indication based on the details provided. An agent will confirm carrier appetite and discounts.</p>
    <div class="quote-box">
      ${summary.map(item => `<span class="pill">${item}</span>`).join('')}
    </div>
    <p>${nextStep}</p>
    <p class="card-footnote">Final pricing may change after carrier underwriting, MVR review, and loss run validation.</p>
  `;

  const payload = {
    fullName: data.get('fullName'),
    email: data.get('email'),
    phone: data.get('phone'),
    company: data.get('company'),
    mcNumber: data.get('mcNumber'),
    trucks,
    cdlBand,
    policies,
    states,
    lossRuns,
    consent,
    timeline,
    range: {
      low: Math.round(low),
      high: Math.round(high)
    },
    source: 'insure.supertruck.ai',
    timestamp: new Date().toISOString()
  };

  const sent = await postLead(payload);
  appendStatus(sent);
  setSubmitting(false);
});

function bandLabel(key) {
  switch (key) {
    case 'elite':
      return 'Elite (0-1 points, clean MVRs)';
    case 'preferred':
      return 'Preferred (2-3 points)';
    case 'standard':
      return 'Standard (4-5 points)';
    case 'watchlist':
      return 'Watchlist (6+ points or recent major)';
    default:
      return 'Not specified';
  }
}

function setSubmitting(isSubmitting) {
  nextBtn.disabled = isSubmitting;
  nextBtn.textContent = isSubmitting ? 'Sending...' : (currentStep === steps.length - 1 ? 'Finish' : 'Next');
}

async function postLead(payload) {
  if (!LEAD_ENDPOINT) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);
    return res.ok;
  } catch (error) {
    clearTimeout(timeout);
    console.warn('Lead post failed', error);
    return false;
  }
}

function appendStatus(sent) {
  const status = document.createElement('p');
  status.className = 'card-footnote';
  status.textContent = sent
    ? 'Lead submitted securely. Our team will call/text shortly.'
    : 'We could not reach the server. Please call +1 (800) 555-1234 or email hello@supertruck.ai.';
  quoteResult.appendChild(status);
}

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  form.reset();
  quoteResult.innerHTML = '';
  currentStep = 0;
  updateSteps();
  form.querySelector('#fullName').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  setSubmitting(false);
}

function openChat() {
  window.location.href = 'tel:+18005551234';
}

function moveStep(direction) {
  const nextIndex = currentStep + direction;
  if (nextIndex < 0 || nextIndex >= steps.length) return;
  currentStep = nextIndex;
  updateSteps();
}

function updateSteps() {
  steps.forEach((step, idx) => {
    step.hidden = idx !== currentStep;
  });

  backBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next';

  const percent = ((currentStep + 1) / steps.length) * 100;
  progressBar.style.setProperty('--fill', `${percent}%`);
  progressBar.dataset.filled = `${percent}%`;

  progressStep.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  progressHint.textContent = stepHint(currentStep);
}

function stepHint(idx) {
  const hints = ['Contact', 'Fleet', 'Coverage', 'Loss runs'];
  return hints[idx] || 'Step';
}

function validateStep(step) {
  const inputs = Array.from(step.querySelectorAll('input, select, textarea'));
  return inputs.every((input) => {
    if (!input.required) return true;
    if (input.type === 'checkbox') return true;
    return Boolean(input.value.trim());
  });
}
