import { Routes, Route } from "react-router-dom";
import { NavBarNew } from "./layout/NavMenu/NavMenuNew";
import { FeaturePage } from "./pages/FeaturePage";
import { AboutPage } from "./pages/AboutPage";
import { OnlineShop } from "./Components/OnlineShop/OnlineShop";
import "./App.css";

const App = () => {
    return (
        <>
            <NavBarNew />
            <Routes>
                <Route path="/" element={null} />
                <Route path="about" element={<AboutPage />} />
                <Route path="shop" element={<OnlineShop />} />
            </Routes>
        </>
    );
};

export default App;
