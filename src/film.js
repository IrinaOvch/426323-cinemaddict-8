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
    this._comments = data.comments;
    this._duration = data.duration;
    this._releaseDate = data.releaseDate;

    this.isWatched = data.isWatched;
    this.isInWatchlist = data.isInWatchlist;
    this.isFavourite = data.isFavourite;

    this._element = null;
    this._onComments = null;

    this._onCommentsLinkClick = this._onCommentsLinkClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
  }

  _onCommentsLinkClick() {
    if (typeof this._onComments === `function`) {
      this._onComments();
    }
  }

  set onComments(eventHandler) {
    this._onComments = eventHandler;
  }

  set onAddToWatchList(eventHandler) {
    this._onAddToWatchList = eventHandler;
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList();
    }
    this.isInWatchlist = !this.isInWatchlist;
  }

  set onMarkAsWatched(eventHandler) {
    this._onMarkAsWatched = eventHandler;
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
    this.isWatched = !this.isWatched;
  }

  update(data) {
    this._comments = data.comments;
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.utc(moment.duration(this._duration, `minutes`).asMilliseconds()).format(`H[h] mm[m]`)}
        </span>
        <span class="film-card__genre">${this._genres[0]}</span>
      </p>
      <img src="./${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
            .addEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
            .addEventListener(`click`, this._onMarkAsWatchedClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsLinkClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
            .removeEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
            .removeEventListener(`click`, this._onMarkAsWatchedClick);
  }
}

