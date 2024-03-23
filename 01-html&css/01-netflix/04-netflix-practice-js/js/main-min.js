"use strict";
var fila = document.querySelector(".main__contenidocarousel"),
  pelicula = document.querySelectorAll(".main__peliculas"),
  botonDerecho = document.getElementById("flecha-derecha"),
  botonisquierdo = document.getElementById("flecha-isquierda");
window.addEventListener("load", function () {
  botonDerecho.addEventListener("click", function () {
    fila.scrollLeft += fila.offsetWidth;
    var e = document.querySelector(".main__buttonind--activo");
    e.nextSibling &&
      (e.nextSibling.classList.add("main__buttonind--activo"),
      e.classList.remove("main__buttonind--activo"));
  }),
    botonisquierdo.addEventListener("click", function () {
      fila.scrollLeft -= fila.offsetWidth;
      var e = document.querySelector(".main__buttonind--activo");
      e.previousSibling &&
        (e.previousSibling.classList.add("main__buttonind--activo"),
        e.classList.remove("main__buttonind--activo"));
    });
  for (var e = Math.ceil(pelicula.length / 5), t = 0; t < e; t++)
    !(function (t) {
      var e = document.createElement("BUTTON");
      0 === t && e.classList.add("main__buttonind--activo"),
        document
          .querySelector(".main__indicadores")
          .appendChild(e)
          .classList.add("main__buttonind"),
        e.addEventListener("mouseenter", function () {
          e.addEventListener("click", function (e) {
            (fila.scrollLeft = t * fila.offsetWidth),
              document
                .querySelector(".main__buttonind--activo")
                .classList.remove("main__buttonind--activo"),
              e.target.classList.add("main__buttonind--activo");
          }),
            fila.removeEventListener("scroll", s, !1);
        }),
        document
          .querySelector(".main__indicadores")
          .addEventListener("mouseleave", function () {
            setTimeout(function () {
              fila.addEventListener("scroll", s);
            }, 2e3);
          });
    })(t);
  pelicula.forEach(function (t) {
    t.addEventListener("mouseenter", function (e) {
      setTimeout(function () {
        t.classList.add("main__peliculahover");
      }, 200),
        t.addEventListener("mouseleave", function (e) {
          t.classList.remove("main__peliculahover");
        });
    });
  });
  function n() {
    l = setInterval(function () {
      (fila.scrollLeft = fila.scrollLeft + d),
        fila.scrollLeft === c
          ? ((d = -15),
            document
              .querySelector(".main__buttonind--activo")
              .classList.remove("main__buttonind--activo"))
          : 0 === fila.scrollLeft &&
            ((d = 10),
            document
              .querySelector(".main__buttonind")
              .classList.add("main__buttonind--activo"),
            fila.addEventListener("scroll", s));
    }, 200);
  }
  function i() {
    clearInterval(l);
  }
  function o() {
    var e = document.querySelector(".main__buttonind--activo");
    e.nextSibling &&
      (e.nextSibling.classList.add("main__buttonind--activo"),
      e.classList.remove("main__buttonind--activo"));
  }
  var a = Math.ceil(pelicula.length / 5),
    c = fila.scrollWidth - fila.clientWidth,
    l = null,
    d = 10,
    s = function () {
      for (var e = 1; e < a; e++)
        fila.scrollLeft == e * fila.offsetWidth && o(),
          e == a - 1 && fila.scrollLeft == e * fila.offsetWidth - 220 && o();
    };
  n(),
    fila.addEventListener("mouseout", function () {
      n();
    }),
    fila.addEventListener("mouseover", function () {
      i();
    }),
    document
      .querySelector(".main__indicadores")
      .addEventListener("mouseover", function () {
        i();
      }),
    document
      .querySelector(".main__indicadores")
      .addEventListener("mouseout", function () {
        n();
      }),
    botonDerecho.addEventListener("mouseover", function () {
      i();
    }),
    botonDerecho.addEventListener("mouseout", function () {
      n();
    }),
    botonisquierdo.addEventListener("mouseover", function () {
      i();
    }),
    botonisquierdo.addEventListener("mouseout", function () {
      n();
    });
});
