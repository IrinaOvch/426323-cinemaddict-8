export const generateFilter = (filter) => {
  return `<a href="#${filter.id}" class="main-navigation__item ${filter.active ? `main-navigation__item--active` : ``} ${filter.additional ? `main-navigation__item--additional` : ``}">${filter.name}${filter.withAmount ? `<span class="main-navigation__item-count">${filter.amount}</span>` : ``}</a>`;
};
