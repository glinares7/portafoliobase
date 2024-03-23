import { db } from "../firebase/config-firebase";

export const loadData = async (uid) => {
  // db.collection(`${uid}/nominas/nomina`).get().then()
  const response = await db.collection(`${uid}/nominas/nomina`).get();
  const data = [];

  // console.log(response);

  response.forEach((nomina) => {
    // console.log(nomina.data());
    const nominaData = nomina.data();
    // console.log(nomina);
    data.push({
      id: nomina.id,
      ...nominaData,
    });
  });

  console.log(data);

  return data;
};
