import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import { RoutesWithNotFound } from "../../utilities"


const Private = () => {
  const Dashboard = lazy(() => import('./dashboard/Dashboard'));
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />

      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      
    </RoutesWithNotFound>
  )
}
export default Private