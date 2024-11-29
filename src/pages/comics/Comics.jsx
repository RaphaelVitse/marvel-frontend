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

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [bookmark, setBookmark] = useState(false);

  const limit = 100;
  const totalCharacters = data.count;
  console.log(totalCharacters);
  const nbMaxPages = Math.ceil(totalCharacters / limit);
  console.log(nbMaxPages);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend-raphael--2652jln5dkl6.code.run/comics/?page=" +
            page +
            "&title=" +
            title
        );
        console.log(response.data);

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
              <div className="seach">
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
                        setBookmark(!bookmark);
                      }}
                    >
                      {bookmark ? (
                        <IoHeartSharp className="bookmark-false" />
                      ) : (
                        <IoHeartOutline className="bookmark-false" />
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
            <div>
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Previous
              </button>
              <button
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
