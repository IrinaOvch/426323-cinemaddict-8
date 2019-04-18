export const RATES = [...new Array(9)].map((element, i) => i + 1);

export const initialFilters = [
  {
    id: `all`,
    additional: false,
    name: `All movies`,
    withAmount: false,
    amount: ``
  },
  {
    id: `watchlist`,
    additional: false,
    name: `Watchlist `,
    withAmount: true,
    amount: ``
  },
  {
    id: `history`,
    additional: false,
    name: `History `,
    withAmount: true,
    amount: ``
  },
  {
    id: `favorites`,
    additional: false,
    name: `Favorites `,
    withAmount: true,
    amount: ``
  },
  {
    id: `stats`,
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
