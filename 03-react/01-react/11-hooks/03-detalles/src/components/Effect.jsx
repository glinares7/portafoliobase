import { useEffect, useState } from "react";

const Effect = () => {
  const [state, setState] = useState(0);

  const evento = (e) => {
    //* AUMENTO DEL CONTADOR
    // setState(state + 1);
    console.log("moviendo");
  };

  //* CLEANUP
  useEffect(() => {
    if (state === "123") {
      window.addEventListener("mousemove", evento);
    }

    return () => {
      console.log("detenido");
      window.removeEventListener("mousemove", evento);
    };
  }, [state]);

  // //* SE EJECUTA UNA VEZ PERO AL CAMBHIAR DE ESTADO LA CONDICIÓN YA NO ES ACCESIBLE (CLEAN UP)
  // useEffect(() => {
  //   if (state == "123") {
  //     // window.addEventListener("mousemove", evento);
  //     console.log("mounted");
  //   }
  //   return () => {
  //     console.log("unmounted");
  //   };

  //   // else {
  //   //   window.removeEventListener("mousemove", evento);
  //   // }
  // }, [state]);

  //* PETICIÓN API
  //? USEEFFECT NO ES ASINCRONO
  // const [users, setUsers] = useState([]);
  // const [id, setId] = useState(10);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   setUsers([
  //     {
  //       hola: "cambie en el id",
  //     },
  //   ]);
  //   console.log(users);
  // }, [id]);
  // //   console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    //* CAMBIA EL ESTADO DEL ID
    // setId(0);
  };

  // console.log(e);

  // console.log({
  //   name: "adfadfsadf",
  //   email: "asfsdfasdfasdfa",
  //   password: "dsfasdfasd",
  // });

  return (
    <>
      <h1>useEffect</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Search
          </label>
          <input
            onChange={(e) => setState(e.target.value)}
            value={state}
            // value={id}
            // onChange={(e) => setId(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Effect;
