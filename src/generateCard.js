import {getRandomElements} from './getRandomElements';

export const generateCard = (film) => {
  return `<article class="film-card">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${film.year}</span>
      <span class="film-card__duration">${film.duration}</span>
      <span class="film-card__genre">${getRandomElements(film.genre, 1)}</span>
    </p>
    <img src="./images/posters/${film.poster}.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">${getRandomElements(film.description, 3).join(` `)}</p>
    <button class="film-card__comments">${film.comments} comments</button>

    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
    </form>
  </article>`;
};
