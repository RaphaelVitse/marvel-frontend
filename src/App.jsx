import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// PAGES

import Home from "./pages/home/Home";
import Comics from "./pages/comics/Comics";
import Characters from "./pages/characters/Characters";
import CharacterComics from "./pages/charactercomics/CharacterComics";

//COMPONENTS

import Headers from "./components/Headers";

function App() {
  const [visible, setVisible] = useState();
  return (
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={<Characters visible={visible} setVisible={setVisible} />}
        />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
      </Routes>
    </Router>
  );
}

export default App;
