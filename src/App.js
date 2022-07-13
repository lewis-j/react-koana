import { Routes, Route } from "react-router-dom";
import { StorePage } from "./pages/StorePage";
import "./App.css";

const Home = () => (
  <div>
    <div className="test1">
      KOANA<div className="test2">V2</div>
    </div>
  </div>
);
const App = () => {
  return (
<<<<<<< HEAD
    <div>
      <div className="test1">
        KOANA<div className="test2">V2</div>
      </div>
      <div>YeAH THIS IS A NEW PART!</div>
      <div className="test1">
        KOANA hey man<div className="test2">V2 is so sweeet</div>
        KOANA<div className="test2">V2</div>
      </div>
      <div className="test1">
        KOANA<div className="test2">V2</div>
        <div className="test2">V3</div>
        KOANA<div className="test2">V8 is my favorite tomato beverage</div>
      </div>
    </div>
=======
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="store" element={<StorePage />} />
    </Routes>
>>>>>>> f0d68417e344afaefe566f116f2512943db2dcb6
  );
};

export default App;
