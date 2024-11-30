import "../charactercomics/characterComics.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import marvel from "../../assets/marvel.jpeg";
import { GrLinkPrevious } from "react-icons/gr";

const CharacterComics = () => {
  const { characterId } = useParams();
  console.log(characterId);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend-raphael--2652jln5dkl6.code.run/comics/${characterId}`
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [characterId]);

  return (
    <main className="main-character">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <div className="head-page">
              <div className="head-page-link">
                <Link className="previous-arrow" to="/characters">
                  <GrLinkPrevious className="icon-arrow" />
                </Link>
              </div>
              <div className="head-page-img-name">
                <div className="head-page-img">
                  <img
                    src={
                      data.thumbnail.path.includes("image_not_available") ||
                      data.thumbnail.extension === "gif"
                        ? marvel
                        : `${data.thumbnail.path}.${data.thumbnail.extension}`
                    }
                    alt={data.name}
                  />
                </div>
                <div className="head-page-description">
                  <h2 className="title-characters">({data.name})</h2>

                  <p className="description-charac">{data.description}</p>
                </div>
              </div>
            </div>
            <div className="character">
              {data.comics.map((charComics) => {
                console.log(charComics);

                return (
                  <section className="character-results" key={charComics._id}>
                    <div className="marvel-comic-card-by-character">
                      <div>
                        <img
                          className="marvel"
                          src={
                            charComics.thumbnail.path.includes(
                              "image_not_available"
                            ) || charComics.thumbnail.extension === "gif"
                              ? marvel
                              : `${charComics.thumbnail.path}.${charComics.thumbnail.extension}`
                          }
                          alt={charComics.name}
                        />
                      </div>
                      <div className="comic-title">{charComics.name}</div>
                      {charComics.description ? (
                        <div className="description-comic">
                          {charComics.description}
                        </div>
                      ) : (
                        <p className="description-comic">
                          No description available
                        </p>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default CharacterComics;
