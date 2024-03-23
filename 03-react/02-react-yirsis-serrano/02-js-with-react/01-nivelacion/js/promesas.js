const sumar = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      reject("esto no es valido");
    } else {
      resolve(a + b);
    }
  });
};

const result = sumar(3, 5)
  .then((res) => {
    // console.log(res);
    document.write(res);
  })
  .catch((err) => {
    // console.log(err);
    document.write(err);
  });

// console.log(result);
