import React from "react";

const Footer = () => {
  return (
    <nav className=" navbar  navbar-dark bg-primary">
      <div>
        <span className="navbar-brand h1">
          {" "}
          Gianmarco - &copy; {new Date().getFullYear()}
        </span>
      </div>
    </nav>
  );
};

export default Footer;
