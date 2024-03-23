import React from "react";

import { Link } from "react-router-dom";

const Pie = () => {
  return (
    <div>
      <ul className="pie__footer">
        <li>
          <Link to={`somos`}>facebook</Link>
        </li>
        <li>
          <Link to={`productos`}>Whatsapp</Link>
        </li>
      </ul>
    </div>
  );
};

export default Pie;
