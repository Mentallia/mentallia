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
