const axios = require("axios");
const fs = require("fs");

class Busquedas {
  historial = [];

  dbPath = "./db/database.json";

  constructor() {
    //TODO: leer DB si existe
    this.leerDB();
  }
  get historialCapitalizado() {
    //*capitalizar cada palabra
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
      types: "place,postcode,address",
    };
  }

  async Ciudad(lugar = "") {
    //* peticion http

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      // const resp = await axios.get(
      //   "https://api.mapbox.com/geocoding/v5/mapbox.places/chorrillos%2Clima.json?types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiZmF2aWNvbjEyMyIsImEiOiJjbGNxY29zazEwNGlkM3ZtZmFjZnhreGNuIn0.YQMbQXjhRaS__Or7VVGoiQ"
      // );
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));

      //* reqres
      // const resp = await axios.get("https://reqres.in/api/users?page=2");
      // resp.data.data.forEach((ali) => {
      //   console.log(ali.first_name);
      // });
    } catch (err) {
      // throw err;
      return []; //retornar los lugares
    }
    // console.log("ciudad", lugar);
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async climaLugar(lat, lon) {
    try {
      //*instancia axios
      const resp = await axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      let info = await resp.get();
      let { weather, main } = info.data;

      //* instanc axios .create

      //*resp.data

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    //* prevenir duplicados

    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 5);
    this.historial.unshift(lugar.toLocaleLowerCase());

    //*grabar en bd
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    //*DEBE DE EXISTIR ~

    if (!fs.existsSync(this.dbPath)) return;
    let info = fs.readFileSync(this.dbPath, { encoding: "utf8" });

    const data = JSON.parse(info);
    console.log("l", data);
    this.historial = data.historial;
  }
}

module.exports = Busquedas;
