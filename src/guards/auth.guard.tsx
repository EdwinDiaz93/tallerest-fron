import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { PublicRoutes } from '../models';

export const AuthGuard = () => {
    const userState = useSelector((store: AppStore) => store.user);
    console.log((userState.token));
    
    return userState.token ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
}


export default AuthGuard;