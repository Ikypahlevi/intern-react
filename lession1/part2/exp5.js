const mergeObjects = (...objects) => {
  let result = {};

  for (let currentObj of objects) {
    result = { ...result, ...currentObj };
  }

  return result;
};

const result = mergeObjects({ a: 1, b: 2 }, { b: 99, c: 3 }, { c: 100, d: 4 });
console.log(result);
