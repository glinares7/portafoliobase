import Header from "../components/Header";

const Faq = () => {
  return (
    <>
      <Header />
      <div className="faq__main">
        <div className="faq__posicion">
          <p>El video en formato mp4 con una resolucion de:</p>
          <p className="faq__formato">720p , 360p , etc</p>
          <p>El formato del audio es:</p>
          <p className="faq__formato"> mp3, m4a</p>
          <p>No soporta la reproducción y descarga en tiempo real.</p>
          <p>
            Inspirado de &nbsp;
            <a
              className="faq__link"
              target="__blank"
              href="https://es.onlinevideoconverter.pro/"
            >
              Online Video Converter
            </a>
          </p>
          <div className="faq__body"></div>
        </div>

        <div className="faq__posicion">
          <p>
            Diseñado e implementado por{" "}
            <a
              className="faq__link"
              target="__blank"
              href="https://github.com/glinares6/portafolio"
            >
              Gianmarco Linares L.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Faq;
