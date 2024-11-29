import "../components/headers.css";
import logo from "../assets/logo-marvel.png";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";

const Headers = () => {
  const [isVisible, setIsVisible] = useState("false");

  const closeMenu = () => {
    setIsVisible(!isVisible);
  };
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
        <div
          className="responsive"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <TiThMenu />
        </div>
        {isVisible && (
          <div className="menu-burger">
            <Link to="/" className="link-head-burger" onClick={closeMenu}>
              Home
            </Link>
            <Link
              to="/characters"
              className="link-head-burger"
              onClick={closeMenu}
            >
              Characters
            </Link>

            <Link to="/comics" className="link-head-burger" onClick={closeMenu}>
              Comics
            </Link>
            <Link
              to="/bookmark"
              className="link-head-burger"
              onClick={closeMenu}
            >
              Bookmark
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Headers;
