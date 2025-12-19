function calculerScores() {

  const canvas = document.getElementById('radarChart');
  canvas.replaceWith(canvas.cloneNode(true));
  
  const themes = {
    motivation: 0,
    concentration: 0,
    stress: 0,
    confiance: 0,
    objectifs: 0,
    imagerie: 0,
    pensées: 0,
    bienetre: 0
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
        "Motivation et Plaisir", "Concentration et Attention", "Gestion du stress et des Emotions",
        "Confiance en soi", "Fixation d'objectifs", "Imagerie mentale",
        "Pensées et Discours internes", "Bien-être"
      ],
      datasets: [{
        label: "Profil mental",
        data: scores,
        fill: true,
        backgroundColor: "rgba(30,58,138,0.2)",
        borderColor: "rgba(18,20,73,1)"
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 15,

          pointLabels: {
          font: {
          size: 14,      // taille du texte
          weight: 'bold' // gras
        },
        color: '#121449' // bleu Mentallia
      },
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
      #121449 ${percentage}%,
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

  steps[currentStep].classList.remove('active');
  currentStep++;

  // Afficher le bouton Retour dès la 2e étape
  if (currentStep > 0) {
    document.getElementById('prevBtn').style.display = 'block';
  }

  // Gestion de la dernière étape
  if (currentStep >= steps.length - 1) {
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('resultBtn').style.display = 'block';
  }

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

function prevStep() {

  // Cacher l'étape actuelle
  steps[currentStep].classList.remove('active');

  currentStep--;

  // Sécurité (ne jamais descendre sous 0)
  if (currentStep < 0) currentStep = 0;

  // Réafficher le bouton Suivant
  document.getElementById('nextBtn').style.display = 'block';
  document.getElementById('resultBtn').style.display = 'none';

  // Cacher le bouton Retour si on revient au début
  if (currentStep === 0) {
    document.getElementById('prevBtn').style.display = 'none';
  }

  // Afficher l'étape précédente
  steps[currentStep].classList.add('active');

  updateProgressBar();
}

function showResults() {

  // Masquer la vue test
  document.getElementById('testView').style.display = 'none';

  // Afficher la vue résultats
  document.getElementById('resultView').style.display = 'block';

  // Calculer et afficher le radar
  calculerScores();
}

function backToTest() {

  // Masquer la vue résultats
  document.getElementById('resultView').style.display = 'none';

  // Réafficher le test
  document.getElementById('testView').style.display = 'block';

  // Revenir à la dernière étape
  steps.forEach(step => step.classList.remove('active'));
  steps[currentStep].classList.add('active');

  updateProgressBar();

  // Réafficher les bons boutons
  document.getElementById('resultBtn').style.display = 'block';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('prevBtn').style.display = 'block';
}
