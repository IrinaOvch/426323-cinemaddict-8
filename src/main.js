import {initialFilters} from './data';
import {Film} from './film';
import {FilmComments} from './film-comments';
import {Filter} from './filter';
import {drawStat, fillStatsWithData, watchedFilmsStat} from './stats';
import {switchFromTo, shake, block, unblock, generateRank} from './utils';
import {API} from './api';
import {Search} from './search';

const AUTHORIZATION = `Basic pueqcpkqtyrfi3mzkk`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const initialFilms = [];
const filterContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const filmsTopRatedContainer = document.querySelector(`.films-list-top-rated`);
const filmsMostCommentedContainer = document.querySelector(`.films-list-most-commented`);
const popupContainer = document.querySelector(`body`);
const searchContainer = document.querySelector(`.search-container`);
const footerStat = document.querySelector(`.footer__statistics`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

const filmSection = document.querySelector(`.films`);
const statSection = document.querySelector(`.statistic`);

let renderedFilms = 0;
let filmsArray = [];

const renderMore = (films, start, end) => {
  films.slice(start, end).forEach((film) => {
    filmsMainContainer.appendChild(film.render());
    renderedFilms++;
  });
  if (films.length > 5) {
    showMoreButton.classList.remove(`visually-hidden`);
  }
};

const render = (films, container, noControls) => {
  container.innerHTML = ``;
  films.forEach((film) => {

    container.appendChild(film.render());
    if (noControls) {
      film.element.classList.add(`film-card--no-controls`);
      film.element.querySelector(`.film-card__controls`).remove();
    }
  });
};

const showMoreFilms = () => {
  renderMore(filmsArray, renderedFilms, renderedFilms + 5);
  if (renderedFilms === filmsArray.length) {
    showMoreButton.classList.add(`visually-hidden`);
  }
};

showMoreButton.addEventListener(`click`, showMoreFilms);

const filterComponents = initialFilters.map((filter) => {
  return new Filter(filter);
});

const filterFunctionsMap = {
  all: () => true,
  watchlist: (it) => it.isInWatchlist === true,
  history: (it) => it.isWatched === true,
  favorites: (it) => it.isFavourite === true,
};


const searchComponent = new Search();


const renderCards = (films, container) => {
  renderedFilms = 0;
  container.innerHTML = ``;
  for (const film of films) {
    const filmComponent = new Film(film);
    const popupFilmComponent = new FilmComments(film);

    initialFilms.push(filmComponent);

    filmComponent.onComments = () => {
      popupFilmComponent.render();
      popupContainer.appendChild(popupFilmComponent.element);
    };

    filmComponent.onAddToWatchList = () => {
      film.isInWatchlist = !film.isInWatchlist;
      filmComponent.isInWatchlist = film.isInWatchlist;
      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        filmComponent.update(newFilm);
      });
      updateFilters();
    };

    filmComponent._onAddToFavoutites = () => {
      film.isFavourite = !film.isFavourite;
      filmComponent.isFavourite = film.isFavourite;
      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        filmComponent.update(newFilm);
      });
      updateFilters();
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      filmComponent.isWatched = film.isWatched;
      film.watchingDate = Date.now();
      filmComponent.watchingDate = film.watchingDate;
      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        filmComponent.update(newFilm);
        updateFilters();
        updateRank();
      });
    };

    footerStat.innerHTML = `<p>${initialFilms.length} movies inside</p>`;

    popupFilmComponent.onClose = () => {
      popupContainer.removeChild(popupFilmComponent.element);
      popupFilmComponent.unrender();
      updateFilters();
      updateRank();
    };

    popupFilmComponent.onAddToWatchList = () => {
      film.isInWatchlist = !film.isInWatchlist;
      filmComponent.isInWatchlist = film.isInWatchlist;
      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        filmComponent.update(newFilm);
      });
    };

    popupFilmComponent._onAddToFavoutites = () => {
      film.isFavourite = !film.isFavourite;
      filmComponent.isFavourite = film.isFavourite;
      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        filmComponent.update(newFilm);
      });
    };

    popupFilmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      filmComponent.isWatched = film.isWatched;
      film.watchingDate = Date.now();
      filmComponent.watchingDate = film.watchingDate;
      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {
        filmComponent.update(newFilm);

      });
    };

    popupFilmComponent.onAddComment = (newComment) => {
      film.comments = [...film.comments, newComment];
      popupFilmComponent.comments = film.comments;

      const commentInput = popupFilmComponent.element.querySelector(`.film-details__comment-input`);
      const filmDetailsStatus = popupFilmComponent.element.querySelector(`.film-details__watched-status`);
      const filmDetailsReset = popupFilmComponent.element.querySelector(`.film-details__watched-reset`);


      commentInput.style.border = ``;
      block(commentInput);

      api.updateFilm({id: film.id, data: film.toRAW()}).then((newFilm) => {

        popupFilmComponent.refreshComments();
        const oldElement = filmComponent.element;
        filmComponent.update(newFilm);
        filmComponent.render();

        filmsMainContainer.replaceChild(filmComponent.element, oldElement);
        unblock(commentInput);
        filmDetailsStatus.innerHTML = `Comment added`;
        filmDetailsReset.classList.remove(`visually-hidden`);
      }).catch(() => {
        shake(commentInput, (() => {
          commentInput.style.border = `2px solid red`;
          unblock(commentInput);
        }));
      });
    };

    popupFilmComponent.onDeleteComment = () => {
      const filmDetailsStatus = popupFilmComponent.element.querySelector(`.film-details__watched-status`);
      const filmDetailsReset = popupFilmComponent.element.querySelector(`.film-details__watched-reset`);
      film.comments.pop();
      popupFilmComponent.comments = film.comments;
      api.updateFilm({id: film.id, data: film.toRAW()}).then(() => {
        popupFilmComponent.refreshComments();

        filmDetailsStatus.innerHTML = `Comment deleted`;
        filmDetailsReset.classList.add(`visually-hidden`);
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
  filmsArray = initialFilms;
  renderMore(initialFilms, renderedFilms, renderedFilms + 5);
  updateFilters();
  updateRank();

  const topRatedFilms = [...initialFilms].sort((a, b) => b._rating - a._rating);
  render(topRatedFilms.slice(0, 2), filmsTopRatedContainer, true);

  const mostCommentedFilms = [...initialFilms].sort((a, b) => b._comments.length - a._comments.length);
  render(mostCommentedFilms.slice(0, 2), filmsMostCommentedContainer, true);
};


const updateFilters = () => {
  const count = (filterName) => {
    const countables = initialFilms.filter(filterFunctionsMap[filterName] || (() => false));
    return countables.length;
  };
  filterComponents.forEach((filter) => {
    filter.amount = count(filter.id);
  });
  renderFilters(filterComponents);
};

const updateRank = () => {
  const personalRank = filterComponents.find((filter) => filter.id === `history`).amount;
  document.querySelector(`.profile__rating`).innerHTML = generateRank(personalRank);
};

const renderFilters = (filters) => {
  filterContainer.innerHTML = ``;

  filters.forEach((filterComponent) => {
    filterContainer.appendChild(filterComponent.render());
  });

};

renderFilters(filterComponents);

const renderSearch = () => {

  searchContainer.appendChild(searchComponent.render());
};

renderSearch();

const onStatsFilterClick = (evt) => {
  drawStat(initialFilms, evt.target.id);
  fillStatsWithData(watchedFilmsStat);

};
const filtersStat = document.querySelectorAll(`.statistic__filters-input`);
filtersStat.forEach((filter) => {
  filter.addEventListener(`click`, onStatsFilterClick);
});


filterComponents.forEach((component) => {
  if (component.id === `stats`) {
    component.onStats = () => {
      drawStat(initialFilms, `statistic-all-time`);
      switchFromTo(statSection, filmSection);
      fillStatsWithData(watchedFilmsStat);
    };
  } else {
    component.onFilter = (id) => {
      switchFromTo(filmSection, statSection);
      const filterName = id;
      const filteredFilms = initialFilms.filter(filterFunctionsMap[filterName] || (() => false));
      renderedFilms = 0;
      filmsMainContainer.innerHTML = ``;
      filmsArray = filteredFilms;
      renderMore(filteredFilms, renderedFilms, renderedFilms + 5);
    };
  }
});


filmsMainContainer.innerHTML = `<p>Loading movies...</p>`;

api.getFilms().then((films) => {
  renderCards(films, filmsMainContainer);
  searchComponent.onSearch = (query) => {
    const filteredFilms = initialFilms.filter((film) => {
      return film._title.toLowerCase().includes(query);
    });
    filmsMainContainer.innerHTML = ``;
    render(filteredFilms, filmsMainContainer);
    showMoreButton.classList.add(`visually-hidden`);
  };
}).catch(() => {
  filmsMainContainer.innerHTML = `<p>Something went wrong while loading movies. Check your connection or try again later</p>`;
});


