import "../comics/comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import logo from "../../assets/logo-marvel.png";
import marvel from "../../assets/marvel.jpeg";
// import { Link } from "react-router-dom";
import { SiMarvelapp } from "react-icons/si";
import { FiSearch } from "react-icons/fi";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
// import Cookies from "js-cookie";

const Comics = ({ bookmark, setBookmark }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  // const [bookmark, setBookmark] = useState([]);

  const limit = 100;
  const totalCharacters = data.count;
  // console.log(totalCharacters);
  const nbMaxPages = Math.ceil(totalCharacters / limit);
  // console.log(nbMaxPages);

  const favorites = (fav) => {
    const isAlreadyFavorited = bookmark.includes(fav);
    // console.log(isAlreadyFavorited);

    let updatedBookmarks;
    if (isAlreadyFavorited) {
      updatedBookmarks = bookmark.filter((id) => id !== fav); // c'est pour retirer un fav
    } else {
      updatedBookmarks = [...bookmark];
      updatedBookmarks.push(fav); //c'est pour ajouter un fav
    }

    setBookmark(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");

    if (savedBookmarks) {
      setBookmark(JSON.parse(savedBookmarks));
    }
  }, [setBookmark]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend-raphael--2652jln5dkl6.code.run/comics/?page=" +
            page +
            "&title=" +
            title
        );
        // console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [title, page]);

  return (
    <main className="main-comics">
      <div className="comics container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <div className="search-container">
              <p className="title-characters-comics">
                Comics <SiMarvelapp />
              </p>
              <div className="search">
                <FiSearch className="icon-search" />
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Search a comics : x-men,..."
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="comic">
              {data.results.map((comics) => {
                // console.log(character.name);

                return (
                  <div key={comics._id} className="comic-card">
                    <div
                      onClick={() => {
                        favorites(comics._id);
                      }}
                    >
                      {bookmark.includes(comics._id) ? (
                        <IoHeartSharp className="bookmark" /> //favorite
                      ) : (
                        <IoHeartOutline className="bookmark" /> //non favorite
                      )}
                    </div>
                    <div>
                      <img
                        className="marvel"
                        src={
                          comics.thumbnail.path.includes(
                            "image_not_available"
                          ) || comics.thumbnail.extension === "gif"
                            ? marvel
                            : `${comics.thumbnail.path}.${comics.thumbnail.extension}`
                        }
                        alt={comics.title}
                      />
                    </div>
                    <div>{comics.title}</div>
                    <div className="description">{comics.description}</div>
                  </div>
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
      </div>
    </main>
  );
};

export default Comics;
