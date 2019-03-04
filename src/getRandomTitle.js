export const getRandomTitle = (array, amount) => {
  return ([...array]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.ceil(Math.random() * amount))).join(` `);
};
