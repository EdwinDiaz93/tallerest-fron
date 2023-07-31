import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes, Roles } from '../../models';
import { RoutesWithNotFound } from "../../utilities"
import { OptionsRepository } from '../../services/options.repository';

import { AppStore } from '../../redux';
import { Dashboard } from './dashboard';
import { Movies } from './Movies';
import { Options } from './Options';
import { RolGuard } from '../../guards';
import Rent from './Rents/Rent';

const Private = () => {
  const [options, setOptions] = useState([]);
  const user = useSelector((store: AppStore) => store.user);
  const optionRepo = useMemo(() => new OptionsRepository(), []);


  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await optionRepo.getOptions();
        if (user.roles?.some(rol => rol.name === Roles.USER)) {
          const menu = response.filter((menu: any) => menu.path === 'rentar')
          setOptions(menu);
        } else {
          const menu = response.filter((menu: any) => menu.path !== 'rentar')
          setOptions(menu);
        }

      } catch (error) {
      }
    }
    getOptions();
  }, [optionRepo, user]);


  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard options={options} />} >
        <Route element={<RolGuard rol={Roles.ADMIN} />}>
          <Route path={PrivateRoutes.OPTIONS} element={<Options />} />
          <Route path={PrivateRoutes.MOVIES} element={<Movies />} />
        </Route>
        <Route element={<RolGuard rol={Roles.USER} />}>
          <Route path={PrivateRoutes.Rent} element={<Rent />} />
        </Route>
      </Route>
    </RoutesWithNotFound>
  )
}
export default Private