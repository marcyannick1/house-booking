import {Route, Routes} from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Home from "@/pages/Home.jsx";
import PrivateRoutes from "@/utils/PrivateRoutes.jsx";
import NavBar from "@/components/NavBar.jsx";
import CreatePropertyModal from "@/components/CreatePropertyModal.jsx";
import {useState} from "react";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <NavBar openModal={() => setIsModalOpen(true)}/>
            <CreatePropertyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </>
    )
}

export default App
