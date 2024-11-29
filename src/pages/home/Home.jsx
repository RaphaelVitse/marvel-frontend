import "../home/home.css";
import characters from "../../assets/perso-marvel.webp";
import comics from "../../assets/comics.jpg";
import { SiMarvelapp } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="home">
      <h1 className="introduction container">
        Welcome in the Marvel World of Comics !
      </h1>
      <section className="presentation container">
        <div>
          <h2> Your are fan of Marvel's characters !</h2>
          <img
            className="img-home"
            src={characters}
            alt="personnages de marvel"
          />
          <button
            onClick={() => {
              navigate("/characters");
            }}
          >
            Click <SiMarvelapp />e
          </button>
        </div>
        <div>
          <h2> Your are fan of Marvel's comics !</h2>
          <img className="img-home" src={comics} alt="couverture de comics" />
          <button
            onClick={() => {
              navigate("/comics");
            }}
          >
            Click <SiMarvelapp />e
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
