import "../components/headers.css";
import logo from "../assets/logo-marvel.png";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <header>
      <nav className="header-nav container">
        <div className="head-img">
          <img src={logo} alt="" />
        </div>
        <Link to="/" className="link-head">
          Home
        </Link>
        <Link to="/characters" className="link-head">
          Characters
        </Link>
        <Link to="/comics" className="link-head">
          Comics
        </Link>
        <Link to="/bookmark" className="link-head">
          Bookmark
        </Link>
      </nav>
    </header>
  );
};

export default Headers;
