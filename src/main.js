import {initialFilters} from './data';
import {Film} from './film';
import {FilmComments} from './film-comments';
import {Filter} from './filter';
import {drawStat, fillStatsWithData, watchedFilmsStat} from './stats';
import {switchFromTo, shake, block, unblock} from './utils';
import {API} from './api';

const AUTHORIZATION = `Basic pueqcpkqtyrfi3mzkk`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const initialFilms = [];
const filterContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const popupContainer = document.querySelector(`body`);

const filmSection = document.querySelector(`.films`);
const statSection = document.querySelector(`.statistic`);

const filterComponents = initialFilters.map((filter) => {
  return new Filter(filter);
});

const renderCards = (films, container) => {
  container.innerHTML = ``;
  for (const film of films) {
    const filmComponent = new Film(film);
    const popupFilmComponent = new FilmComments(film);
    initialFilms.push(filmComponent);

    container.appendChild(filmComponent.render());

    filmComponent.onComments = () => {
      popupFilmComponent.render();
      popupContainer.appendChild(popupFilmComponent.element);
    };

    popupFilmComponent.onClose = () => {
      popupContainer.removeChild(popupFilmComponent.element);
      popupFilmComponent.unrender();
    };

    popupFilmComponent.onAddComment = (newComment) => {
      film.comments = [...film.comments, newComment];
      popupFilmComponent.comments = film.comments;

      const commentInput = popupFilmComponent.element.querySelector(`.film-details__comment-input`);

      commentInput.style.border = ``;
      block(commentInput);

      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {

        popupFilmComponent.refreshComments();
        const oldElement = filmComponent.element;
        filmComponent.update(newFilm);
        filmComponent.render();

        filmsMainContainer.replaceChild(filmComponent.element, oldElement);
        unblock(commentInput);
      }).catch(() => {
        shake(commentInput, (() => {
          commentInput.style.border = `2px solid red`;
          unblock(commentInput);
        }));
      });
    };

    popupFilmComponent.onRate = (newRate) => {
      const rateLabels = popupFilmComponent.element.querySelectorAll(`.film-details__user-rating-label`);
      const currentRateLabel = popupFilmComponent.element.querySelector(`.film-details__user-rating-label[for='rating-${newRate}']`);
      const rateInputs = popupFilmComponent.element.querySelectorAll(`.film-details__user-rating-input`);
      const ratingScoreBlock = popupFilmComponent.element.querySelector(`.film-details__user-rating-score`);

      rateLabels.forEach((label) => {
        label.style.backgroundColor = ``;
      });
      rateInputs.forEach(block);


      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        film.userRating = newRate;
        popupFilmComponent.element.querySelector(`.film-details__user-rating`).innerText = `Your rate ${newRate}`;
        popupFilmComponent.update(newFilm);

        rateInputs.forEach(unblock);
      }).catch(() => {
        shake(ratingScoreBlock, (() => {
          currentRateLabel.style.backgroundColor = `red`;
          rateInputs.forEach(unblock);
        }));
      });
    };


  }
};

const reRenderCards = (cards, container) => {
  container.innerHTML = ``;
  cards.forEach((filmComponent) => {
    container.appendChild(filmComponent.render());
  });
};

const renderFilters = (filters) => {
  filters.forEach((filterComponent) => {
    filterContainer.appendChild(filterComponent.render());
  });
};

renderFilters(filterComponents);

const filterFunctionsMap = {
  all: () => true,
  watchlist: (it) => it.isInWatchlist === true,
  history: (it) => it.isWatched === true,
  favourites: (it) => it.isFavourite === true,
};

filterComponents.forEach((component) => {
  if (component.id === `stats`) {
    return;
  }
  component.onFilter = (id) => {
    switchFromTo(filmSection, statSection);
    const filterName = id;
    const filteredFilms = initialFilms.filter(filterFunctionsMap[filterName] || (() => false));
    reRenderCards(filteredFilms, filmsMainContainer);
  };
});
const statsButton = document.querySelector(`.main-navigation__item--additional`);

const onStatsClick = (evt) => {
  drawStat(initialFilms);
  evt.preventDefault();
  switchFromTo(statSection, filmSection);
  fillStatsWithData(watchedFilmsStat);
};
statsButton.addEventListener(`click`, onStatsClick);


filmsMainContainer.innerHTML = `<p>Loading movies...</p>`;

api.getFilms().then((films) => {
  renderCards(films, filmsMainContainer);

}).catch(() => {
  filmsMainContainer.innerHTML = `<p>Something went wrong while loading movies. Check your connection or try again later</p>`;
});
