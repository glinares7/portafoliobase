//* SE COPIAN TODAS LAS RUTAS DEL SITIO
const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./style.css",
  "./components/Contador.js",
];

const CACHE_NAME = "v3_cache_contador_react";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        //* IMPRIMIR  LOS CACHES
        // console.log(cacheNames);
        return Promise.all(
          cacheNames.map((cacheName) => {
            return (
              cacheWhitelist.indexOf(cacheName) === -1 &&
              caches.delete(cacheName)
            );
          })
        );
      })
      //* SOLICITAR EL CACHE EN LA RED
      .then(() => self.clients.claim())
  );
});

//* captura paticion
self.addEventListener("fetch", (e) => {
  //* MOSTRA LAS PERICIONES DEL CACHE
  // console.log(e.request);
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((res) => {
//       if (res) {
//         return res;
//       }

//       return fetch(e.request);
//     })
//   );
// });
