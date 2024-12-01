import "../bookmark/bookmark.css";
import Cookies from "js-cookie";

const Bookmark = ({ bookmark, setBookmark }) => {
  const cookiesValue = Cookies.get("bookmarks");
  console.log(cookiesValue);

  return (
    <main className="main-bookmark">
      <div className="container">
        <p>UNDER CONSTRUCTION</p>
        <section>
          <h2>My Favorites Characters</h2>
          {/* {cookiesValue.map((fav) => {
          return console.log(fav);
        })} */}
        </section>
        <section>
          <h2>My Favorites Comics</h2>
          {/* {cookiesValue.map((fav) => {
          return console.log(fav);
        })} */}
        </section>
      </div>
    </main>
  );
};

export default Bookmark;
