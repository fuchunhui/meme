const splitArray = (array, size) => {
  let start = 0;
  let end = 0;
  let result = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    start = i * size;
    end = start + size;
    result.push(array.slice(start, end));
  }
  return result;
};

export {
  splitArray
};
