import { Routes, Route } from "react-router-dom";
import { NavbarNew } from "./layout/NavMenu/";
import { StorePage } from "./pages/StorePage";
import { AboutPage } from "./pages/AboutPage";
import "./App.css";

const FeaturesPage = () => <div></div>;
const App = () => {
    return (
        <>
            <NavbarNew />
            <Routes>
                <Route path="/" element={<FeaturesPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="store" element={<StorePage />} />
            </Routes>
        </>
    );
};

export default App;
