import "../charactercomics/characterComics.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import marvel from "../../assets/marvel.jpeg";

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
    <main className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <div>
            <button>Précédent</button>
            <div>
              <img
                src={
                  data.thumbnail.path.includes("image_not_available") ||
                  data.thumbnail.extension === "gif"
                    ? marvel
                    : `${data.thumbnail.path}.${data.thumbnail.extension}`
                }
                alt={data.name}
              />
              <h2 className="title-characters">({data.name})</h2>
            </div>
            <p>{data.description}</p>
          </div>
          <div className="character">
            {data.comics.map((charComics) => {
              console.log(charComics);

              return (
                <section key={charComics._id}>
                  <div className="marvel-card">
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
                    <div>{charComics.name}</div>
                    {charComics.description ? (
                      <div className="description">
                        {charComics.description}
                      </div>
                    ) : (
                      <p className="description">No description available</p>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default CharacterComics;
