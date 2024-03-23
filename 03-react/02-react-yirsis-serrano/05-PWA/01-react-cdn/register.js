//* 1ra forma
//
// if ("serviceWorker" in navigator) {
// console.log("si existe");
// }

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("./sw.js ");
}
