type RandomNumber = (x?: number) => number;

const MIN = 0;
const MAX = 826;

const getRandomNumber: RandomNumber = (dodgeThisOne?: number) => {
  const number = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  if (number === dodgeThisOne) return getRandomNumber(dodgeThisOne);
  return number;
};

export const getVoteOptions = () => {
  const first = getRandomNumber();
  const second = getRandomNumber(first);
  return [first, second];
};
