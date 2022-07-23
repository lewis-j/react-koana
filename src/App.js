import { Routes, Route } from "react-router-dom";
import { StorePage } from "./pages/StorePage";
import { Navbar } from "./layout/NavMenu";
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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="store" element={<StorePage />} />
      </Routes>
    </>
  );
};

export default App;
