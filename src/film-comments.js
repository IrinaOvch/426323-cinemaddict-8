import {getRandomElements} from './utils';
import {Component} from './component';
import {RATES, EMOJIS} from './data';
import moment from 'moment';


export class FilmComments extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._poster = data.poster;
    this._description = data.description;
    this._rating = data.rating;
    this._genres = data.genres;
    this._comments = data.comments;
    this._duration = data.duration;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._releaseDate = data.releaseDate;
    this._country = data.country;
    this._ageLimit = data.ageLimit;

    this._state.chosenCommentEmoji = `sleeping`;
    this._userRating = data.userRating ? data.userRating : ``;

    this._element = null;
    this._onComments = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onAddCommentMessage = this._onAddCommentMessage.bind(this);
    this._onChooseEmoji = this._onChooseEmoji.bind(this);
    this._onChooseRating = this._onChooseRating.bind(this);
  }

  refresh() {
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  set onClose(fn) {
    this._onClose = fn;
  }


  _onChooseEmoji(evt) {
    this._state.chosenCommentEmoji = evt.target.value;
    this._element.querySelector(`.film-details__add-emoji-label`).innerText = EMOJIS[this._state.chosenCommentEmoji];
  }

  _onAddCommentMessage(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      const newComment = {
        text: evt.target.value,
        author: `Tim Macoveev`,
        date: Date.now(),
        emoji: this._state.chosenCommentEmoji,
      };
      if (typeof this._onAddComment === `function`) {
        this._onAddComment(newComment);
      }
    }
  }

  set onAddComment(fn) {
    this._onAddComment = fn;
  }

  set onRate(fn) {
    this._onRate = fn;
  }

  _onChooseRating(evt) {
    const newRate = evt.target.value;
    this._element.querySelector(`.film-details__user-rating`).innerText = `Your rate ${newRate}`;
    if (typeof this._onRate === `function`) {
      this._onRate(newRate);
    }
  }

  update(data) {
    this._comments = data.comments;
    this._userRating = data.userRating;
  }

  refreshComments() {
    this.unbind();
    this._element.querySelector(`.film-details__comments-wrap`).innerHTML = this.commentsTemplate;
    this.bind();
  }

  get commentsTemplate() {
    return `
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">1</span></h3>

          <ul class="film-details__comments-list">
            ${this._comments.map((comment) => {
    return `
              <li class="film-details__comment">
              <span class="film-details__comment-emoji">${EMOJIS[comment.emoji]}</span>
              <div>
                <p class="film-details__comment-text">${comment.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
                </p>
              </div>
            </li>`;
  }).join(``)}
          </ul>

          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">${EMOJIS[this._state.chosenCommentEmoji]}</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

              <div class="film-details__emoji-list">
              ${Object.entries(EMOJIS).map((emoji) => {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji[0]}" value="${emoji[0]}" ${this._state.chosenCommentEmoji === emoji[0] ? `checked` : ``}>
                         <label class="film-details__emoji-label" for="emoji-${emoji[0]}">${emoji[1]}</label>`;
  }).join(``)}
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
            </label>
          </div>
    `;
  }

  get template() {
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${this._poster}.jpg" alt="incredables-2">

            <p class="film-details__age">${this._ageLimit}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: Невероятная семейка</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate ${this._userRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._releaseDate).format(`D MMMM YYYY`)} (${this._country})</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${moment.duration(this._duration).asMinutes()} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getRandomElements(this._genres, 3).map((genre) => (
    `<span class="film-details__genre">${genre}</span>`
  )).join(``)}
              </tr>
            </table>

            <p class="film-details__film-description">
               ${getRandomElements(this._description, 3).join(` `)}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
          ${this.commentsTemplate}
        </section>

        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">Incredibles 2</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${RATES.map((rate) => {
    return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${rate}" id="rating-${rate}" ${rate === this._userRating ? `checked` : ``}>
                          <label class="film-details__user-rating-label" for="rating-${rate}">${rate}</label>`;
  }).join(``)}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`;
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__comment-input`)
        .addEventListener(`keydown`, this._onAddCommentMessage);
    this._element.querySelectorAll(`.film-details__emoji-item`).forEach((element) => {
      element.addEventListener(`click`, this._onChooseEmoji);
    });
    this._element.querySelectorAll(`.film-details__user-rating-input`).forEach((element) => {
      element.addEventListener(`click`, this._onChooseRating);
    });
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__comment-input`)
        .removeEventListener(`keydown`, this._onAddCommentMessage);
    this._element.querySelectorAll(`.film-details__emoji-item`).forEach((element) => {
      element.removeEventListener(`click`, this._onChooseEmoji);
    });
    this._element.querySelectorAll(`.film-details__user-rating-input`).forEach((element) => {
      element.removeEventListener(`click`, this._onChooseRating);
    });
  }
}
