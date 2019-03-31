import {films, initianFilters} from './data';
import {Film} from './film';
import {FilmComments} from './film-comments';
import {Filter} from './filter';
import {drawStat, fillStatsWithData, watchedFilmsStat} from './stats';
import {switchFromTo} from './utils';


const filterContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const commentsContainer = document.querySelector(`body`);

const filmSection = document.querySelector(`.films`);
const statSection = document.querySelector(`.statistic`);

const filterComponents = initianFilters.map((filter) => {
  return new Filter(filter);
});
const filmComponents = films.map((film) => {
  return new Film(film);
});
const commentsFilmComponents = films.map((film) => {
  return new FilmComments(film);
});

const renderCards = (cards, container) => {
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

const filterFunctionsMap = {
  all: () => true,
  watchlist: (it) => it.isInWatchlist === true,
  history: (it) => it.isWatched === true,
};

filterComponents.forEach((component) => {
  if (component.id === `stats`) {
    return;
  }
  component.onFilter = (id) => {
    switchFromTo(filmSection, statSection);
    const filterName = id;
    const filteredFilms = filmComponents.filter(filterFunctionsMap[filterName] || (() => false));
    renderCards(filteredFilms, filmsMainContainer);
  };
});
const statsButton = document.querySelector(`.main-navigation__item--additional`);

const onStatsClick = (evt) => {
  drawStat(filmComponents);
  evt.preventDefault();
  switchFromTo(statSection, filmSection);
  fillStatsWithData(watchedFilmsStat);
};
statsButton.addEventListener(`click`, onStatsClick);
