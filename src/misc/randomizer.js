function randomizer(from, to) {
  const res = from + Math.ceil(Math.random() * (to - from));
  return res;
}

export default randomizer;

