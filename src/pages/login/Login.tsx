import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthRepository } from '../../services';
import { createUser } from '../../redux/states/user';
import { useEffect } from 'react';
import { AppStore } from '../../redux';
const Login = () => {
  const authRepo = new AuthRepository();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store: AppStore) => store.user);

  const login = async () => {
    const user = await authRepo.login();
    dispatch(createUser(user));
    navigate('/private/dashboard', { replace: true });
  }

  useEffect(() => {
    const redirect = () => {
      if (user.token) {
        navigate('/private/dashboard', { replace: true })
      }
    }
    redirect();
  })
  return (
    <>
      <h2>Login</h2>
      <button className="p-2 border-2 bg-violet-400 border-violet-500 text-white" onClick={login}>Login</button>
    </>

  )
}
export default Login