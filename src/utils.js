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
    return `Fann`;
  }
  return `Movie buff`;
};
