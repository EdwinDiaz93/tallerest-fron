import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Card } from '../../../components';
import { Movie } from '../../../interfaces';
import { AppStore } from '../../../redux';
import { MoviesRepository } from '../../../services';
import { setMovies } from '../../../redux/states/movie';
const Rent = () => {

  const movieRepo = useMemo(() => new MoviesRepository(), [])
  const movies = useSelector((store: AppStore) => store.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      const response = await movieRepo.getMovies();
      dispatch(setMovies(response));
    }
    getMovies();
  }, [movieRepo, dispatch]);

  const rentMovie = (movie: Movie) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Movie ${movie.name} rented`,
      showConfirmButton: false,
      timer: 2500
    });

  }


  return (
    <>
      <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  gap-2">
        {
          movies.rows.map(movie => (
            <Card movie={movie} key={movie.id} rentMovie={rentMovie} />
          ))
        }
      </div>
    </>
  )
}
export default Rent