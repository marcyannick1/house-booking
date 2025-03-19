import {Route, Routes} from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Home from "@/pages/Home.jsx";
import PrivateRoutes from "@/utils/PrivateRoutes.jsx";

function App() {
    return (
        <>
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
