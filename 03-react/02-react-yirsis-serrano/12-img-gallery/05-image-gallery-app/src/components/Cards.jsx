import { useFetchImages } from "../hooks/useFetchImages";
import Card from "./Card";
import FromImg from "./FromImg";
import Loading from "./Loading";

const Cards = () => {
  //* envio de una imagen
  const [images, loading, handleSubmit] = useFetchImages();
  return (
    <div className="text-center">
      <FromImg handleSubmit={handleSubmit} />
      <hr />

      {loading && <Loading />}

      <div className="row">
        {images.map((img) => {
          return (
            <div key={img.id} className="col">
              <Card img={img.urls.regular} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
