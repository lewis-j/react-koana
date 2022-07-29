import { Routes, Route } from "react-router-dom";
import { Navbar } from "./layout/NavMenu";
import { StorePage } from "./pages/StorePage";
import { AboutPage } from "./pages/AboutPage";
import "./App.css";

const FeaturesPage = () => (
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
        <Route path="/" element={<FeaturesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="store" element={<StorePage />} />
      </Routes>
    </>
  );
};

export default App;
