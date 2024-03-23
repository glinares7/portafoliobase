//* PROMISE
// const saludo = () => {
//   return new Promise((resolve, reject) => {
//     resolve("hola mundo");
//   });
// };

// saludo().then((response) => console.log(response));

//* ASYNC
// const saludo = async () => {
//   return "hola mundo";
// };
//
// saludo().then((response) => console.log(response));

const peticion = async () => {
  setTimeout(() => {
    const datos = {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
    };
    console.log(datos);
  }, 2000);
};

peticion().then(console.log("await"));
