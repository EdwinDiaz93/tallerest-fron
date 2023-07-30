import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { PrivateRoutes, Roles } from "../models";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const rolUser = userState.email.includes('admin') && Roles.ADMIN;
    return rolUser === Roles.ADMIN ? <Outlet /> : <Navigate replace to={PrivateRoutes.PRIVATE} />
}
export default AdminGuard 