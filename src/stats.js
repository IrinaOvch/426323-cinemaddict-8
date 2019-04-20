import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {statOptions} from './stat-options';
import moment from 'moment';
import 'moment-duration-format';

moment.updateLocale(`en`, {
  durationLabelTypes: [{type: `standard`, string: `___`}]
});

const BAR_HEIGHT = 50;

const statCtx = document.querySelector(`.statistic__chart`);
const statRankLabel = document.querySelector(`.statistic__rank-label`);
const statisticTextList = document.querySelector(`.statistic__text-list`);
const watchedFilmsStat = {};

statCtx.height = BAR_HEIGHT * 6;

const getGenreStats = (films) => {
  return films.reduce((acc, film) => {
    film._genres.forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
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
  return Object.entries(stats).sort((left, right) => right[1] - left[1]);
};

const periods = {
  'statistic-all-time': () => true,
  'statistic-today': (it) => moment(it.watchingDate).isSame(Date.now(), `day`),
  'statistic-week': (it) => moment(it.watchingDate).isSame(Date.now(), `week`),
  'statistic-month': (it) => moment(it.watchingDate).isSame(Date.now(), `month`),
  'statistic-year': (it) => moment(it.watchingDate).isSame(Date.now(), `year`),
};

const getStat = (cards, period) => {
  const filteredCards = cards.filter((card) => card.isWatched);
  const periodCards = filteredCards.filter(periods[period]);
  watchedFilmsStat.amount = periodCards.length;
  watchedFilmsStat.duration = getTotalDuration(periodCards);
  const genreStats = getGenreStats(periodCards);
  const sortedGenreStats = sortStats(genreStats);
  const labels = sortedGenreStats.map(([label]) => label);
  const values = sortedGenreStats.map((item) => item[1]);
  watchedFilmsStat.mostWatchedGenre = labels[0];
  return {labels, values};
};

const fillStatsWithData = (stat) => {
  statRankLabel.innerHTML = rankLabels[stat.mostWatchedGenre] || `Beginner`;
  const statisticList = [
    {
      title: `You watched`,
      text: `${stat.amount} <span class="statistic__item-description">movies</span>`
    },
    {
      title: `Total duration`,
      text: `${moment.duration(stat.duration, `minutes`).format(`H [<span class="statistic__item-description">h</span>] mm[<span class="statistic__item-description">m</span>]`)}`,
    },
    {
      title: `Top genre`,
      text: `${stat.mostWatchedGenre || `—`}`,
    }
  ];
  statisticTextList.innerHTML = statisticList.map((statItem) => {
    return `
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">${statItem.title}</h4>
      <p class="statistic__item-text">${statItem.text}</p>
    </li>`;
  }).join(``);
};

export const rankLabels = {
  "Comedy": `ComedyLover`,
  "Horror": `Horror-Fan`,
  "Drama": `DramaTic`,
  "Fantasy": `Fantastic`,
  "Thriller": `ThrillerLover`,
  "Animation": `AnimationLover`,
  "Adventure": `Globetrotter`,
  "Action": `Actioner`,
  "Family": `Family-guy`,
  "Sci-Fi": `Sci-Fighter`
};

const myChart = new Chart(statCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: `#ffe800`,
      hoverBackgroundColor: `#ffe800`,
      anchor: `start`
    }]
  },
  options: statOptions,
});

const drawStat = (cards, period) => {
  statCtx.innerHTML = ``;
  const genresStat = getStat(cards, period);

  myChart.data.labels = genresStat.labels;
  myChart.data.datasets.forEach((dataset) => {
    dataset.data = genresStat.values;
  });
  myChart.update();
  return myChart;
};

export {drawStat, watchedFilmsStat, fillStatsWithData};
