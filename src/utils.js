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

export const switchFromTo = (from, to) => {
  from.classList.remove(`visually-hidden`);
  to.classList.add(`visually-hidden`);
};

export const shake = (element, callback) => {
  const ANIMATION_TIMEOUT = 600;
  element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
    if (typeof callback === `function`) {
      callback();
    }
  }, ANIMATION_TIMEOUT);
};


export const block = (element) => {
  element.disabled = true;
};

export const unblock = (element) => {
  element.disabled = false;
};

export const generateRank = (rank) => {
  if (rank < 1) {
    return ``;
  }
  if (rank <= 10) {
    return `Novice`;
  }
  if (rank <= 20) {
    return `Fan`;
  }
  
  return `Movie buff`;
};


