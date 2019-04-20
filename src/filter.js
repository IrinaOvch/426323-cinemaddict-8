import {Component} from "./component";

export class Filter extends Component {

  constructor(data) {
    super();
    this.id = data.id;
    this._active = data.active;
    this._additional = data.additional;
    this._name = data.name;
    this.amount = data.amount;
    this._withAmount = data.withAmount;

    this._element = null;

    this._onFilterClick = this._onFilterClick.bind(this);
    this._onStatsClick = this._onStatsClick.bind(this);
  }

  set onFilter(eventHandler) {
    this._onFilter = eventHandler;
  }

  set onStats(eventHandler) {
    this._onStats = eventHandler;
  }

  get template() {
    return `<a href="#${this.id}" id="${this.id}" class="main-navigation__item ${this._active ? `main-navigation__item--active` : ``} ${this._additional ? `main-navigation__item--additional` : ``}">${this._name}${this._withAmount ? `<span class="main-navigation__item-count">${this.amount}</span>` : ``}</a>`.trim();
  }

  bind() {
    this._element.addEventListener(
        `click`,
        this._element.id === `stats` ? this._onStatsClick : this._onFilterClick
    );
  }

  unbind() {
    this._element.removeEventListener(
        `click`,
        this._element.id === `stats` ? this._onStatsClick : this._onFilterClick
    );
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt.target.id);
    }
  }

  _onStatsClick(evt) {
    evt.preventDefault();
    if (typeof this._onStats === `function`) {
      this._onStats(evt);
    }
  }
}
