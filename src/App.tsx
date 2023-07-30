import { useEffect } from 'react';
import MovieForm from './components/MovieForm';
import { AuthRepository } from './services';
import './App.css';
import { IUser } from './interfaces';

function App() {
  const authRepo = new AuthRepository();

  useEffect(() => {
    const get = async () => {
      try {
        const response:IUser = await authRepo.login();
        console.log(response);
      } catch (error:any) {
        console.log(error);
      }
    }
    get();
  }, []);


  return (
    <div>
      <h1 className='header'>Películas</h1>
      <MovieForm />
    </div>
  );
}

export default App;
