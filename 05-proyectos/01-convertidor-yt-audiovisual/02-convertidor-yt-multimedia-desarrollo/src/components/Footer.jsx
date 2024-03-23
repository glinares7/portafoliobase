import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    console.log("pie de pagina");
  }, []);

  return (
    <>
      <div className="pie"></div>
    </>
  );
};

export default Footer;
