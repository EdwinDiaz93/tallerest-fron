import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { PrivateRoutes, Roles } from "../models";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    rol: Roles,
}

const RolGuard = ({ rol }: Props) => {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.roles?.find(rolUser => rolUser.name === rol) ? <Outlet /> : <Navigate replace to={PrivateRoutes.DASHBOARD} />
}
export default RolGuard 