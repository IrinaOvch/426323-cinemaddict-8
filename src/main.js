import {generateFilter} from './generateFilter';
import {generateCard} from './generateCard';

const filterSection = document.querySelector(`.main-navigation`);
const mainCardContainer = document.querySelector(`.films-list .films-list__container`);
const cardContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

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


const renderCards = (place, amount) => {
  place.insertAdjacentHTML(`beforeend`, new Array(amount)
    .fill(generateCard())
    .join(``));
};

renderCards(mainCardContainer, 7);

cardContainers.forEach((place) => {
  renderCards(place, 2);
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const filterInputs = filterSection.querySelectorAll(`.main-navigation__item`);

filterInputs.forEach((input) => {
  input.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    mainCardContainer.innerHTML = ``;
    cardContainers.forEach((place) => {
      place.innerHTML = ``;
    });
    renderCards(mainCardContainer, getRandomInt(1, 10));
    cardContainers.forEach((place) => {
      renderCards(place, getRandomInt(1, 10));
    });
  });
});
