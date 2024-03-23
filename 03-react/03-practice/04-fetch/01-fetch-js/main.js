const textApp = document.getElementById("arr");

const arreglo = [
  "todos",
  "somos",
  "necesarios",
  "sin",
  "importar",
  "la",
  "raza",
  "ni",
  "condicion",
  "social",
];

//* fetch JSON placeholder
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((data) => {
//     for (const element of data) {
//       //   console.log(element);
//       console.log(element.name);
//     }
//   });

// *for of
// const array = ["a", "b", "c"];
// for (const element of array) {
//   console.log(element);
// }

const array2 = [2, 3, 4, 5, 7];
const indice = [
  { name: "july" },
  { name: "marco" },
  { name: "javier" },
  { name: "miguel" },
  { name: "arcangel" },
];
const indice3 = [{ name: "messi" }, { name: "mbappe" }, { name: "batistuta" }];
const indice2 = [3, 5, 7, 1];
const indice1 = [3, 5, 7, 1];
const indice4 = [{ id: 3 }, { id: 5 }, { id: 7 }];

//* forin
// for (const key in indice) {
//   // const element = object[key];
//   console.log("yape", arreglo[key]);
// }

// //*  adicionar arreglo
indice.push(...indice4.map((x) => x));
console.log("muestrame lo que tienes ", indice);

// // console.log(indice2);

// //* ejemplo1
// indice2.map((x) => console.log(x + 2));

// const valor1 = indice1.map((x) => x + 2);

// console.log("indice1", valor1);

// // *ejemplo2
// indice4.map((valor) => console.log({ id: valor.id + 2 }));
// const aya = indice4.map((valor) => valor.id + 20);
// console.log("indice4", aya);

//* agregando valores al texto

const texto = ` <h1>agregar <sub>texto</sub> al <sup>DOM</sup></h1>`;

const texto2 = `<h1 style="color:red"  ><sub>todo</sub> sale bien
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Autem maiores reiciendis <br>eligendi
                </h1>`;
// console.log(textApp);
textApp.innerText = texto2;

//* agregar array al DOM

const filas = document.getElementById("filas");

//*creamos el elementos para enviar al html

//* forEach
array2.forEach((element) => {
  let nLista = document.createElement("LI");
  filas.appendChild(nLista);

  nLista.innerHTML = element;
});

// for (const ele of indice) {
//   let nLista = document.createElement("H2");
//   filas.appendChild(nLista);

//   nLista.innerHTML = ele.name;
// }

// *map
// indice.map((x) => {
//   let nLista = document.createElement("H2");
//   filas.appendChild(nLista);

//   nLista.innerHTML = x.name || x.id;
// });

// *filter

// const result1 = indice.filter((x) => x.id > 4);
// const result = indice.filter((x) => x.name);

// const result2 = result.filter((x) => x.name.length > 5);
// console.log(result2);

// for (const ele of result) {
//   console.log("filterA", ele);
// }
// for (const ele of result1) {
//   console.log("filterB", ele);
// }
// const ea = indice.map((x) => x.name);
//* reduce

const a = [[1, 5], [2], [3], [6]];
const b = [{ id: 3 }, { id: 25 }, { id: 16 }];

const c = [
  "platano",
  "platano",
  "fresa",
  "naranja",
  "uva",
  "uva",
  "fresa",
  "platano",
];

//* arreglo bidimensional(suma)
// const suministrar = a.reduce((c, d) => {
//   return c.concat(d);
// }, []);

// const suministrar2 = suministrar.reduce((c, d) => {
//   return c + d;
// }, 0);
// console.log("reduce", suministrar2);

//* suma objeto
// const obj = b.reduce((c, d) => {
//   return c + d.id;
// }, 0);
// console.log(obj);

// *suma repetidos
// const result = c.reduce((x, y) => {
//   x[y] = (x[y] || 0) + 1;
//   return x;
// }, []);

// console.log(result);

//* fetch

const btnfetch = document.getElementById("btnfetch");
const inptext = document.getElementById("inptext");
const log = document.getElementById("log");

btnfetch.addEventListener("click", () => {
  const filas2 = document.getElementById("filas2");
  console.log("envio desde el boton");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      for (const element of data) {
        const newList = document.createElement("LI");

        filas2.append(newList);

        newList.textContent = element.name;
      }
    });
});

inptext.addEventListener("keypress", (e) => {
  // if (e.key === "q") {
  //   console.log("la letra es ", e.key);

  //   log.textContent += e.key;
  // } else {
  //   console.log("tecleo otra letra", e.key);
  // }

  console.log("los valores son", e.key);
  log.textContent = e.key;

  //* event input
  // log.textContent = e.target.value;
});
// *forin
// console.log(ea);

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((result) => {
//     console.log("pre-fetch", result);
//     return result.json();
//   })
//   .then((datos) => {
//     console.log("post-fetch", datos);
//     for (const el in datos) {
//       const it = document.createElement("LI");

//       filas.appendChild(it);

//       it.innerHTML = datos[el].name;
//       console.log(datos[el].name);
//     }
//   });

//* fetch async-await

// const fetchfunc = async () => {
//   const peticion = await fetch("https://jsonplaceholder.typicode.com/users");

//   console.log("url-fetch", peticion);
//   const envio = await peticion.json();
//   console.log("Pre-fetch", envio);
//   return envio;
// };
// fetchfunc().then((datos) => {
//   console.log("post-Fetch", datos);

//   datos.forEach((element) => {
//     const to = document.createElement("H1");
//     filas.appendChild(to);

//     to.innerHTML = element.email;
//   });
// });

//* fetch post
// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

const subpost = document.getElementById("subpost");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
subpost.addEventListener("click", () => {
  const filas2 = document.getElementById("filas2");
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      body: input1.value,
      title: input2.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("POST", json);
      const list = document.createElement("li");

      filas2.appendChild(list);

      list.innerHTML = `<h1>lista 1 ${json.body}</h1>
                     <h1>lista 2 ${json.title}</h1>
                     `;
    });
});

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((json) => console.log("GET", json));
//* forEach
// datos.forEach((element) => {
//   const to = document.createElement("H1");
//   filas.appendChild(to);

//   to.innerHTML = element.name;
// })

// const fetchPromise = fetch("https://ghibliapi.herokuapp.com/people");
// fetchPromise
//   .then((response) => {
//     return response.json();
//   })
//   .then((people) => {
//     console.log(people);
//   });

// *Fetch axios
// axios
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then((response) => {
//     response.data.forEach((element) => {
//       const newList = document.createElement("H2");

//       filas.appendChild(newList);
//       newList.innerHTML = element.name;
//     });
//   })
//   .catch((error) => console.log(error));

// https://medium.com/@armando_amador/how-to-make-http-requests-using-fetch-api-and-promises-b0ca7370a444

//* params
// axios.get("url",{
//   params: {
//     ID: 12345
//   }
// })
// then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// })

//* Fetch axios-async-await
// async function getUser() {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     const myfunc = await response.data;
//     console.log(myfunc);
//     return myfunc;
//   } catch (error) {
//     console.error(error);
//   }
// }

// getUser().then((action) => {
//   action.forEach((ele) => {
//     const ing = document.createElement("H2");
//     filas.append(ing);

//     ing.innerHTML = ele.name;
//   });
// });

//* axios post

// axios
//   .post("https://jsonplaceholder.typicode.com/posts", {
//     id: 101,
//     title: "foo",
//     body: "bar",
//     userId: 101,
//   })
//   .then(function (response) {
//     console.log("post", response);
//   });

// axios
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then((response) => console.log("get", response.data));
