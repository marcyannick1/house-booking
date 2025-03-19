import {Outlet, Navigate} from 'react-router-dom'
import {useSelector} from "react-redux";

const PrivateRoutes = () => {
    const {userToken} = useSelector(state => state.auth);

    return (
        userToken ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes