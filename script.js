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
  const value = slider.value;
  const percentage = ((value - 1) / 4) * 100;

  slider.style.background = `
    linear-gradient(
      to right,
      #1e3a8a ${percentage}%,
      #ddd ${percentage}%
    )
  `;
  const labels = ["Jamais", "Rarement", "Parfois", "Souvent", "Toujours"];
slider.nextElementSibling.nextElementSibling.innerText = labels[value - 1];

}

window.onload = function () {
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => updateSlider(slider));
};
