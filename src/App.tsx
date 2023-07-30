import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthGuard } from './guards';
import { RoutesWithNotFound } from './utilities';
import { PrivateRoutes, PublicRoutes } from './models';


function App() {

  const Login = lazy(() => import('./pages/login/Login'));
  const Private = lazy(() => import('./pages/private/Private'));

  return (
    <div className='App'>
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />

              <Route path={PublicRoutes.LOGIN} element={<Login />} />

              <Route element={<AuthGuard />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
              </Route>

              <Route path='*' element={<>Not Found</>} />
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  )
}

export default App
