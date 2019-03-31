import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {statOptions} from './stat-options';
import moment from 'moment';

const BAR_HEIGHT = 50;

const statCtx = document.querySelector(`.statistic__chart`);
const textStat = document.querySelectorAll(`p.statistic__item-text`);
const statRankLabel = document.querySelector(`.statistic__rank-label`);
const watchedFilmsStat = {};

statCtx.height = BAR_HEIGHT * 5;

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

const getStat = (cards) => {
  const filteredCards = cards.filter((card) => card.isWatched);
  watchedFilmsStat.amount = filteredCards.length;
  watchedFilmsStat.duration = getTotalDuration(filteredCards);
  const genreStats = getGenreStats(filteredCards);
  const sortedGenreStats = sortStats(genreStats);
  const labels = sortedGenreStats.map(([label]) => label);
  // eslint-disable-next-line no-unused-vars
  const values = sortedGenreStats.map(([label, value]) => value);
  watchedFilmsStat.mostWatchedGenre = labels[0];
  return {labels, values};
};

const fillStatsWithData = (stat) => {
  statRankLabel.innerHTML = rankLabels[stat.mostWatchedGenre] || `Beginner`;
  textStat[0].innerHTML = `${stat.amount} <span class="statistic__item-description">movies</span>`;
  textStat[1].innerHTML = `${moment.utc(moment.duration(stat.duration).asMilliseconds()).format(`H[<span class="statistic__item-description">h</span>] mm[<span class="statistic__item-description">m</span>]`)}`;
  textStat[2].innerHTML = `${stat.mostWatchedGenre || `—`}`;
};

export const rankLabels = {
  "Comedy": `ComedyLover`,
  "Horror": `Horror-Fan`,
  "Drama": `DramaTic`,
  "Fantasy": `Fantastic`,
  "Thriller": `ThrillerLover`,
  "Animation": `AnimationLover`,
  "Sci-Fi": `Sci-Fighter`
};

const drawStat = (cards) => {
  const genresStat = getStat(cards);
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
    options: statOptions,
  });
  return myChart;
};

export {drawStat, watchedFilmsStat, fillStatsWithData};
