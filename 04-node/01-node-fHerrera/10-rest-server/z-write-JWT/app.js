const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//* algotirmos admitidos HS384, HS512, RS256, RS384, RS512, PS256, PS384, PS512, ES256, ES384 y ES512.
//todo creacion de un token y clave secreta algoritmo HS256

// // definir la información del payload
// const payload = {
//   subject: "123456",
//   name: "John Doe",
//   iat: Date.now(),
// };

// // generar una clave secreta aleatoria
// const secret = crypto.randomBytes(32).toString("hex");
// console.log(`Clave secreta: ${secret}`);

// //* firmar el token y modificar el algoritmo
// const options = { algorithm: "HS512" };
// const token = jwt.sign(payload, secret, options);

// console.log(`Token: ${token}`);

// // verificar token
// // jwt.verify(token, secret, (err, decoded) => {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log(decoded);
// //   }
// // });

// // decodificar token
// const decoded = jwt.decode(token);
// console.log("payload", decoded);

// const decoded1 = jwt.decode(token, { complete: true });
// const header = decoded1.header;

// console.log("header", header);

//todo extraccion de las credenciales una vez obtenido el token y clave secreta

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiMTIzNDU2IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc0MjYxNjc0NzE1fQ.128rnAjVSd6Avt3SGh9iRx9ScsWt3YviFTmVIvNORI0";

const secretkey =
  "d5bb2ab4d2b64deddc4e5b5afee45f75a66006db70432cae184596dcb5d27e38";

// verificar token
// jwt.verify(token, secretkey, (err, decoded) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(decoded);
//   }
// });

const secret = secretkey;

jwt.verify(token, secret, (err, decoded) => {
  //*^validar la firma
  const parts = token.split(".");
  const signature = parts[2];

  if (err) {
    // console.log(err);

    console.log("la firma no es valida", signature);
  } else {
    // console.log(decoded);
    console.log("firma", signature);
  }
});

const decoded1 = jwt.decode(token, { complete: true });
const header = decoded1.header;
console.log("header", header);

// decodificar token
const decoded = jwt.decode(token);
console.log("payload", decoded);

//*credenciales algoritmo HS256
// Clave secreta: d5bb2ab4d2b64deddc4e5b5afee45f75a66006db70432cae184596dcb5d27e38

// Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiMTIzNDU2IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc0MjYxNjc0NzE1fQ.128rnAjVSd6Avt3SGh9iRx9ScsWt3YviFTmVIvNORI0

// payload { subject: '123456', name: 'John Doe', iat: 1674261674715 }

// header { alg: 'HS256', typ: 'JWT' }

//*credenciales algoritmo HS512
// Clave secreta: e4557568a22d622eff1c7efc029e4d1c0fd706cf4691844c16abdfe1014bf397

// Token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiMTIzNDU2IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc0MjY1MzI5MDM4fQ.nK31z-gdAxze7gS0SV8HP1y4u07Mekr7SDdTdubwAmtYvjdXR0RjdUzVkMKzN9furhtliqI8VNR8O8XruAj1pA

// payload { subject: '123456', name: 'John Doe', iat: 1674265329038 }
// header { alg: 'HS512', typ: 'JWT' }

//* ALGORITMO RSA  ~ para la creación del token se usa la clave privada(RSA) no la clave secreta(JWT)

// const crypto = require('crypto');
// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicExponent: 65537,
//   privateExponent: BigInt('0x10001'),
// });
// console.log(privateKey);
// console.log(publicKey);

// * API chatGPT
// https://beta.openai.com/docs/api-reference/introduction/authentication

//*JWT en el navegador
// function parseJwt(token) {
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace("-", "+").replace("_", "/");
//   return JSON.parse(window.atob(base64));
// }

// parseJwt(token);

//* para saber la fecha
// let iat = new Date();
// console.log(iat);
// iat.setTime(1516239022 * 1000);

// console.log(iat);
