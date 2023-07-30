import { useState, useEffect, lazy, useMemo } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import { RoutesWithNotFound } from "../../utilities"
import { OptionsRepository } from '../../services/options.repository';

import { Dashboard } from './dashboard';
import { Movies } from './Movies';
import { Options } from './Options';

const Private = () => {
  const [options, setOptions] = useState([]);

  const optionRepo = useMemo(() => new OptionsRepository(), []);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await optionRepo.getOptions();
        setOptions(response);
      } catch (error) {
      }
    }
    getOptions();
  }, [optionRepo]);


  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard options={options} />} >
        <Route path={PrivateRoutes.MOVIES} element={<Movies />} />
        <Route path={PrivateRoutes.OPTIONS} element={<Options />} />
      </Route>
    </RoutesWithNotFound>
  )
}
export default Private