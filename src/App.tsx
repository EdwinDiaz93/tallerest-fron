import { useEffect } from 'react';
import MovieForm from './components/MovieForm';
import { AuthRepository } from './services';
import { IUser } from './interfaces';

function App() {
  
  useEffect(() => {
    const get = async () => {
      try {
        const authRepo = new AuthRepository();
        const response:IUser = await authRepo.login();
        console.log(response);
      } catch (error:any) {
        console.log(error);
      }
    }
    get();
  }, []);


  return (
    <div className='App'>
      <h1 className='header text-2xl text-center'>Películas</h1>
      <MovieForm />
    </div>
  );
}

export default App;
