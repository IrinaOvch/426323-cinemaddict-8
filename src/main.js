import {generateFilter} from './generateFilter';
import {films} from './data';
import {Film} from './film';
import {FilmComments} from './film-comments';

const filterSection = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const filmsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

const filters = [
  {
    id: `all`,
    active: true,
    additional: false,
    name: `All movies`,
    withAmount: false,
    amount: ``
  },
  {
    id: `watchlist`,
    active: false,
    additional: false,
    name: `Watchlist `,
    withAmount: true,
    amount: `13`
  },
  {
    id: `history`,
    active: false,
    additional: false,
    name: `History `,
    withAmount: true,
    amount: `4`
  },
  {
    id: `favorites`,
    active: false,
    additional: false,
    name: `Favorites `,
    withAmount: true,
    amount: `8`
  },
  {
    id: `stats`,
    active: false,
    additional: true,
    name: `Stats`,
    withAmount: false,
    amount: ``
  }
];
const renderFilter = (filter) => {
  const filterTemplateText = generateFilter(filter);
  filterSection.insertAdjacentHTML(`beforeend`, filterTemplateText);
};

filters.forEach(renderFilter);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const filterInputs = filterSection.querySelectorAll(`.main-navigation__item`);
const filmComponents = films.map((film) => {
  return new Film(film);
});
const commentsFilmComponents = films.map((film) => {
  return new FilmComments(film);
});


filmComponents.forEach((filmComponent) => {
  filmsMainContainer.appendChild(filmComponent.render());
});
const commentsContainer = document.querySelector(`body`);

const renderCards = (place, amount, cardArr) => {
  cardArr.slice(0, amount).forEach((film) => {
    place.appendChild(film.render());
  });
};

filterInputs.forEach((input) => {
  input.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsMainContainer.innerHTML = ``;
    filmsContainers.forEach((place) => {
      place.innerHTML = ``;
    });
    renderCards(filmsMainContainer, getRandomInt(1, 10), filmComponents);
    filmsContainers.forEach((place) => {
      renderCards(place, getRandomInt(1, 10), filmComponents);
    });
  });
});

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

