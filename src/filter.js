import {Component} from "./component";

export class Filter extends Component {

  constructor(data) {
    super();
    this._id = data.id;
    this._active = data.active;
    this._additional = data.additional;
    this._name = data.name;
    this._amount = data.amount;
    this._withAmount = data.withAmount;

    this._element = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt.target.id);
    }
  }

  set onFilter(eventHandler) {
    this._onFilter = eventHandler;
  }

  get template() {
    return `<a href="#${this._id}" id="${this._id}" class="main-navigation__item ${this._active ? `main-navigation__item--active` : ``} ${this._additional ? `main-navigation__item--additional` : ``}">${this._name}${this._withAmount ? `<span class="main-navigation__item-count">${this._amount}</span>` : ``}</a>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}
