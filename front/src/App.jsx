import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Home from "@/pages/Home.jsx";
import PrivateRoutes from "@/utils/PrivateRoutes.jsx";
import NavBar from "@/components/NavBar.jsx";
import CreatePropertyModal from "@/components/CreatePropertyModal.jsx";
import Property from "@/pages/Property.jsx";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation(); // 🔹 Récupérer l’URL actuelle

    // 🔹 Vérifier si on est sur les pages Login ou Register
    const hideNavBar = location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            {!hideNavBar && <NavBar openModal={() => setIsModalOpen(true)} />}
            <CreatePropertyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/property/:id" element={<Property />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;