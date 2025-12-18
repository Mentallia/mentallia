function calculerScores() {

  const themes = {
    stress: 0,
    confiance: 0,
    concentration: 0,
    motivation: 0,
    emotions: 0,
    energie: 0,
    objectifs: 0,
    plaisir: 0
  };

  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {
    const theme = slider.dataset.theme;
    themes[theme] += parseInt(slider.value);
  });

  afficherRadar(Object.values(themes));
}

function afficherRadar(scores) {

  const ctx = document.getElementById('radarChart').getContext('2d');

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        "Stress", "Confiance", "Concentration",
        "Motivation", "Émotions", "Énergie",
        "Objectifs", "Plaisir"
      ],
      datasets: [{
        label: "Profil mental",
        data: scores,
        fill: true,
        backgroundColor: "rgba(30,58,138,0.2)",
        borderColor: "rgba(30,58,138,1)"
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 15
        }
      }
    }
  });
}

function updateSlider(slider) {

  const value = parseInt(slider.value);
  const labels = ["Jamais", "Rarement", "Parfois", "Souvent", "Toujours"];

  // Pourcentage de déplacement (0 à 100)
  const percentage = ((value - 1) / 4) * 100;

  // Mise à jour du fond du curseur
  slider.style.background = `
    linear-gradient(
      to right,
      #1e3a8a ${percentage}%,
      #ddd ${percentage}%
    )
  `;

  // Récupération de la bulle
  const label = slider.parentElement.querySelector('.slider-label');

  // Texte
  label.innerText = labels[value - 1];

  // Position horizontale
  label.style.left = `${percentage}%`;
}
let currentStep = 0;
const steps = document.querySelectorAll('.step');

function nextStep() {

  // Cacher l'étape actuelle
  steps[currentStep].classList.remove('active');

  currentStep++;

  // Si on arrive à la dernière étape
  if (currentStep >= steps.length - 1) {
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('resultBtn').style.display = 'block';
  }

  // Afficher la nouvelle étape
  steps[currentStep].classList.add('active');

  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentStep + 1) / steps.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
}

// Initialisation
window.onload = function () {
  updateProgressBar();
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => updateSlider(slider));
};

