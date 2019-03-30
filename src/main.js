import {films, filters} from './data';
import {Film} from './film';
import {FilmComments} from './film-comments';
import {Filter} from './filter';
import {drawStat, getRankLabel, watchedFilmsStat} from './stats';
import moment from 'moment';

const filterContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const commentsContainer = document.querySelector(`body`);

const filmSection = document.querySelector(`.films`);
const statSection = document.querySelector(`.statistic`);
const textStat = document.querySelectorAll(`p.statistic__item-text`);
const statRankLabel = document.querySelector(`.statistic__rank-label`);

const filterComponents = filters.map((filter) => {
  return new Filter(filter);
});
const filmComponents = films.map((film) => {
  return new Film(film);
});
const commentsFilmComponents = films.map((film) => {
  return new FilmComments(film);
});

const renderCards = (cardsArr, container) => {
  container.innerHTML = ``;
  cardsArr.forEach((filmComponent) => {
    container.appendChild(filmComponent.render());
  });
};

const renderFilters = (filtersArr) => {
  filtersArr.forEach((filterComponent) => {
    filterContainer.appendChild(filterComponent.render());
  });
};

renderFilters(filterComponents);
renderCards(filmComponents, filmsMainContainer);

filmComponents.forEach((component, index) => {
  component.onComments = () => {
    commentsFilmComponents[index].render();
    commentsContainer.appendChild(commentsFilmComponents[index].element);
  };
});

commentsFilmComponents.forEach((component) => {
  component.onClose = () => {
    commentsContainer.removeChild(component.element);
    component.unrender();
  };
});

filmComponents.forEach((component) => {
  component.onMarkAsWatched = () => {

  };
});

const filterFilms = (initialFilms, filterName) => {
  switch (filterName) {
    case `all`:
      return initialFilms;

    case `watchlist`:
      return initialFilms.filter((it) => it._isInWatchlist === true);

    case `history`:
      return initialFilms.filter((it) => it._isWatched === true);
    default:
      return [];
  }
};

filterComponents.forEach((component) => {
  if (component._id === `stats`) {
    return;
  }
  component.onFilter = (id) => {
    filmSection.classList.remove(`visually-hidden`);
    statSection.classList.add(`visually-hidden`);
    const filterName = id;
    const filteredFilms = filterFilms(filmComponents, filterName);
    renderCards(filteredFilms, filmsMainContainer);
  };
});
const statsButton = document.querySelector(`.main-navigation__item--additional`);

const onStatsClick = (evt) => {
  drawStat(filmComponents);
  evt.preventDefault();
  statSection.classList.remove(`visually-hidden`);
  filmSection.classList.add(`visually-hidden`);
  statRankLabel.innerHTML = getRankLabel(watchedFilmsStat.mostWatchedGenre);
  textStat[0].innerHTML = `${watchedFilmsStat.amount} <span class="statistic__item-description">movies</span>`;
  textStat[1].innerHTML = `${moment.utc(moment.duration(watchedFilmsStat.duration).asMilliseconds()).format(`H[<span class="statistic__item-description">h</span>] mm[<span class="statistic__item-description">m</span>]`)}`;
  textStat[2].innerHTML = `${watchedFilmsStat.mostWatchedGenre || `—`}`;
};
statsButton.addEventListener(`click`, onStatsClick);
