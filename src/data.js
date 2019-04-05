export const RATES = [...new Array(9)].map((element, i) => i + 1);

export const initialFilters = [
  {
    id: `all`,
    active: false,
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

export const EMOJIS = {
  "sleeping": `😴`,
  "neutral-face": `😐`,
  "grinning": `😀`,
};
