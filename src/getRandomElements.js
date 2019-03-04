export const getRandomElements = (set, amount) => {
  return [...set]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.ceil(Math.random() * amount));
};
