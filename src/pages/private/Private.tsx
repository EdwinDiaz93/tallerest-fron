import { useState, lazy, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import { RoutesWithNotFound } from "../../utilities"
import { OptionsRepository } from '../../services/options.repository';


const Private = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const optionRepo = new OptionsRepository();
    const getOptions = async () => {
      try {
        const response = await optionRepo.getOptions();
        setOptions(response);
      } catch (error) {
      }
    }
    getOptions();
  }, [options, setOptions]);

  const Dashboard = lazy(() => import('./dashboard/Dashboard'));

  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />

      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />

    </RoutesWithNotFound>
  )
}
export default Private