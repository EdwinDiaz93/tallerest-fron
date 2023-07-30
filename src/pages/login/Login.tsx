import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthRepository } from '../../services';
import { createUser } from '../../redux/states/user';
const Login = () => {
  const authRepo = new AuthRepository();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    const user = await authRepo.login();
    dispatch(createUser(user));
    navigate('/private/dashboard', { replace: true });
  }
  return (
    <>
      <h2>Login</h2>
      <button className="p-2 border-2 bg-violet-400 border-violet-500 text-white" onClick={login}>Login</button>
    </>

  )
}
export default Login