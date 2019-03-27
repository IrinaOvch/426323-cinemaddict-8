import {getRandomElements} from './utils';
import {Component} from './component';
import moment from 'moment';

export class Film extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._poster = data.poster;
    this._description = data.description;
    this._rating = data.rating;
    this._genres = data.genres;
    this._commentsAmount = data.commentsAmount;
    this._duration = data.duration;
    this._releaseDate = data.releaseDate;

    this._element = null;
    this._onComments = null;
  }

  _onCommentsLinkClick() {
    if (typeof this._onComments === `function`) {
      this._onComments();
    }
  }

  set onComments(fn) {
    this._onComments = fn;
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.utc(moment.duration(this._duration).asMilliseconds()).format(`H[h] mm[m]`)}
        </span>
        <span class="film-card__genre">${getRandomElements(this._genres, 1)}</span>
      </p>
      <img src="./images/posters/${this._poster}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${getRandomElements(this._description, 3).join(` `)}</p>
      <button class="film-card__comments">${this._commentsAmount} comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsLinkClick);
  }
}
