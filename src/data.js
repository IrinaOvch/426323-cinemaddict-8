import {getRandElements, getRandomInt} from './utils';
export const RATES = [...new Array(9)].map((element, i) => i + 1);
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_IN_HOUR = 60000;

const defaultGenres = new Set([
  `Comedy`,
  `Horror`,
  `Drama`,
  `Fantasy`,
  `Thriller`,
  `Animation`,
  `Sci-Fi`
]);

export const films = [...new Array(10)].map(() => {
  return {
    title: [
      `The favourite`,
      `Roma`,
      `Green book`,
      `Black panther`,
      `BlacKkKlansman`,
      `Bohemian rhapsody`,
      `Vice`,
      `At eternity’s gate`,
      `The wife`,
      `Can you ever forgive me?`,
      `If Beale Street could talk`,
      `Cold war`,
      `Incredibles 2`,
      `Isle of dogs`,
      `Ralph breaks the internet`,
      `Spider-Man: into the Spider-Verse`,
    ][Math.floor(Math.random() * 16)],
    poster: [
      `accused`,
      `blackmail`,
      `blue-blazes`,
      `fuga-da-new-york`,
      `moonrise`,
      `three-friends`,
    ][Math.floor(Math.random() * 6)],
    country: [
      `USA`,
      `Russia`,
      `Sweden`,
      `Denmark`,
      `France`,
      `Germany`,
      `UK`,
    ][Math.floor(Math.random() * 7)],
    description: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      `Cras aliquet varius magna, non porta ligula feugiat eget.`,
      `Fusce tristique felis at fermentum pharetra.`,
      `Aliquam id orci ut lectus varius viverra.`,
      `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
      `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Sed sed nisi sed augue convallis suscipit in sed felis.`,
      `Aliquam erat volutpat.`,
      `Nunc fermentum tortor ac porta dapibus.`,
      `In rutrum ac purus sit amet tempus.`,
    ],
    rating: (Math.random() * (10 - 1) + 1).toFixed(1),
    releaseDate: Date.now() + 1 + Math.floor(Math.random() * 365) * MS_IN_DAY,
    comments: [
      {
        text: `So long-long story, boring!`,
        author: `Tim Macoveev`,
        date: Date.now() - 1 - Math.floor(Math.random() * 7) * MS_IN_DAY,
        emoji: `sleeping`,
      }
    ],
    genres: getRandElements(defaultGenres, 3),
    commentsAmount: Math.round(Math.random() * 100),
    duration: Math.floor(getRandomInt(15, 180)) * MS_IN_HOUR,
    ageLimit: Math.floor(getRandomInt(6, 18)),
    userRating: Math.floor(getRandomInt(1, 10)),
    director: `Brad Bird`,
    writers: `Brad Bird`,
    actors: [
      `Samuel L. Jackson`,
      `Catherine Keener`,
      `Sophia Bush`
    ],
    isWatched: false,
    isInWatchlist: false,
    isFavourite: false,
  };
});

export const initianFilters = [
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
