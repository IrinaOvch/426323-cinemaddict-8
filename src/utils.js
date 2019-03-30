export const getRandomElements = (set, amount) => {
  return [...set]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.round(Math.random() * amount));
};

export const getRandElements = (set, amount) => {
  return [...set]
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
