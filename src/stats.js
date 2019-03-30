import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const statCtx = document.querySelector(`.statistic__chart`);
export const watchedFilmsStat = {};

const BAR_HEIGHT = 50;
statCtx.height = BAR_HEIGHT * 5;

const getGenreStats = (films) => {
  return films.reduce((acc, film) => {
    film._genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = 0;
      }
      acc[genre]++;
    });
    return acc;
  }, {});
};

const getTotalDuration = (films) => {
  return films.reduce((acc, film) => {
    return acc + film._duration;
  }, 0);
};

const sortStats = (stats) => {
  return Object.entries(stats).sort((a, b) => b[1] - a[1]);
};

const getStat = (cardsArr) => {
  const filteredCards = cardsArr.filter((card) => card._isWatched);
  watchedFilmsStat.amount = filteredCards.length;
  watchedFilmsStat.duration = getTotalDuration(filteredCards);
  const genreStats = getGenreStats(filteredCards);
  const labels = sortStats(genreStats).map((item) => item[0]);
  const values = sortStats(genreStats).map((item) => item[1]);
  watchedFilmsStat.mostWatchedGenre = labels[0];
  return {labels, values};
};

export const getRankLabel = (genre) => {
  switch (genre) {
    case `Comedy`:
      return `ComedyLover`;
    case `Horror`:
      return `Horror-Fan`;
    case `Drama`:
      return `DramaTic`;
    case `Fantasy`:
      return `Fantastic`;
    case `Thriller`:
      return `ThrillerLover`;
    case `Animation`:
      return `AnimationLover`;
    case `Sci-Fi`:
      return `Sci-Fighter`;
    default:
      return `Beginner`;
  }
};

export const drawStat = (cardsArr) => {
  const genresStat = getStat(cardsArr);
  const myChart = new Chart(statCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresStat.labels,
      datasets: [{
        data: genresStat.values,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
  return myChart;
};
