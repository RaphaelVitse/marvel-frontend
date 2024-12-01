import "../characters/characters.css";
import { useState, useEffect } from "react";
import axios from "axios";
import marvel from "../../assets/marvel.jpeg";
import { Link } from "react-router-dom";
import { SiMarvelapp } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import Cookies from "js-cookie";

const Characters = ({ bookmark, setBookmark }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  // const [bookmark, setBookmark] = useState([]);

  const limit = 100;
  const totalCharacters = data.count;
  // console.log(totalCharacters);
  const nbMaxPages = Math.ceil(totalCharacters / limit);
  // console.log(nbMaxPages);

  const favorites = (fav) => {
    // console.log("fav", fav);

    const isAlreadyFavorited = bookmark.includes(fav);

    let updatedBookmarks;
    if (isAlreadyFavorited) {
      updatedBookmarks = bookmark.filter((id) => id !== fav); // je retire des favoris
    } else {
      updatedBookmarks = [...bookmark];
      updatedBookmarks.push(fav); //c'est pour ajouter un fav
    }
    setBookmark(updatedBookmarks);
    Cookies.set("bookmarks", JSON.stringify(updatedBookmarks), {
      expires: 180,
    });
  };
  useEffect(() => {
    const savedBookmarks = Cookies.get("bookmarks");

    if (savedBookmarks) {
      setBookmark(JSON.parse(savedBookmarks));
    }
  }, [setBookmark]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend-raphael--2652jln5dkl6.code.run/characters/?page=" +
            page +
            "&name=" +
            name
        );
        // console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, name]);

  return (
    <div className="main-characters">
      <main className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <div className="search-container">
              <p className="title-characters-comics">
                Characters <SiMarvelapp />
              </p>
              <div className="search">
                <FiSearch className="icon-search" />
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Search a heroe : Spiderman,..."
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="character">
              {data.results.map((character) => {
                // console.log(character.name);

                return (
                  <section key={character._id}>
                    <div className="marvel-comic-card">
                      <div
                        onClick={() => {
                          favorites(character._id);
                        }}
                      >
                        {bookmark.includes(character._id) ? (
                          <IoHeartSharp className="bookmark" /> //favorite
                        ) : (
                          <IoHeartOutline className="bookmark" /> //non favorite
                        )}
                      </div>

                      <div className="img-name">
                        <img
                          className="marvel"
                          src={
                            character.thumbnail.path.includes(
                              "image_not_available"
                            ) || character.thumbnail.extension === "gif"
                              ? marvel
                              : `${character.thumbnail.path}.${character.thumbnail.extension}`
                          }
                          alt={character.name}
                        />
                      </div>
                      <div className="name">{character.name}</div>
                      <div className="description">{character.description}</div>
                    </div>
                    <div className="more-details">
                      <Link
                        to={`/comics/${character._id}`}
                        className="more-details-icon"
                      >
                        More details
                      </Link>
                    </div>
                  </section>
                );
              })}
            </div>
            <div className="btn-pagination">
              <button
                className="btn-previous-next"
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Previous
              </button>
              <button
                className="btn-previous-next"
                disabled={page === nbMaxPages}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Characters;
