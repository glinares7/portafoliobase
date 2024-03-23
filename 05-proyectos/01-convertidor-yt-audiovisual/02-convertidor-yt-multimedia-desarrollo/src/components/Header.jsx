import { Link } from "react-router-dom";
import "../scss/index.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="menu">
          <div className="items__menu">
            <p className="txt__header">Online Video Converter </p>
          </div>
          <div className="items__menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
