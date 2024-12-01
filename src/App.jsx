import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// PAGES

import Home from "./pages/home/Home";
import Comics from "./pages/comics/Comics";
import Characters from "./pages/characters/Characters";
import CharacterComics from "./pages/charactercomics/CharacterComics";
import Bookmark from "./pages/bookmark/Bookmark";

//COMPONENTS

import Headers from "./components/Headers";
import Footer from "./components/Footer";

function App() {
  const [bookmark, setBookmark] = useState(Cookies.get("bookmarks") || []);
  console.log(bookmark);

  return (
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={<Characters bookmark={bookmark} setBookmark={setBookmark} />}
        />
        <Route
          path="/comics"
          element={<Comics bookmark={bookmark} setBookmark={setBookmark} />}
        />
        <Route
          path="/bookmark"
          element={<Bookmark bookmark={bookmark} setBookmark={setBookmark} />}
        />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
