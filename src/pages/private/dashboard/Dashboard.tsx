import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { resetUser } from "../../../redux/states/user";
import { AppStore } from '../../../redux/store';
import { NavBar } from "../../../components";
import { resetMovies } from "../../../redux/states/movie";

interface Props {
  options: any
}

const Dashboard = ({ options }: Props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: AppStore) => store.user);


  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(resetMovies())
    navigate('/login', { replace: true });
  }


  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <NavBar options={options} />
            </li>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">{user.name}</h5>
            <button className="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex space-x-4">
              <p><span className="font-semibold">Bienvenido: </span> {user.email}</p>
            </div>
          </div>
        </div>

        <div className="px-6 pt-6 2xl:container">
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default Dashboard