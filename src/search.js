import {Component} from "./component";

export class Search extends Component {

  constructor() {
    super();

    this._element = null;

    this._onKeyUp = this._onKeyUp.bind(this);
  }

  set onSearch(eventHandler) {
    this._onSearch = eventHandler;
  }

  get template() {
    return `
    <form class="header__search search">
      <input type="text" name="search" class="search__field" placeholder="Search">
      <button type="submit" class="visually-hidden">Search</button>
    </form>`.trim();
  }

  bind() {
    this._element.querySelector(`.search__field`).addEventListener(`keyup`, this._onKeyUp);
  }

  unbind() {
    this._element.querySelector(`.search__field`).removeEventListener(`keyup`, this._onKeyUp);
  }

  _onHandleSearch(query) {
    if (typeof this._onSearch === `function`) {
      this._onSearch(query);
    }
  }

  _onKeyUp(evt) {
    if (evt.code === `Enter`) {
      return;
    }

    const searchQuery = evt.target.value;
    this._onHandleSearch(searchQuery);
  }
}
