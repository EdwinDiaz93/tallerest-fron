import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { AppStore } from "../../../redux";
import { Modal, Table } from "../../../components"
import { MoviesRepository } from "../../../services";
import { setMovies } from "../../../redux/states/movie";
import { ITableHeaders, Movie, MovieFormValues } from "../../../interfaces";
import { MovieForm } from "./components";
import { dateTransform } from "../../../utilities";

const Movies = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [movie, setMovie] = useState<MovieFormValues>({
    id: 0,
    name: '',
    budget: 0,
    date: '',
    duration: 0,
  });

  const dispatch = useDispatch();
  const data = useSelector((store: AppStore) => store.movie);
  const movieRepo = useMemo(() => new MoviesRepository(), []);

  const headers: ITableHeaders[] = [
    { key: "name", label: "Name" },
    { key: "budget", label: "Budget" },
    { key: "date", label: "Date" },
    { key: "duration", label: "Duration (minutes)" },
  ];

  // functions
  const showMovie = (movie: Movie) => {
    setMovie({
      id: +movie.id,
      name: movie.name,
      budget: movie.budget,
      date: movie.date,
      duration: movie.duration,
    });
    setShowDetail(true);
  };

  const editMovie = (movie: Movie) => {
    setMovie({
      id: +movie.id,
      name: movie.name,
      budget: movie.budget,
      date: movie.date,
      duration: movie.duration,
    });
    setShowModal(true);
  };

  const deleteMovie = (movie: Movie) => {
    try {
      Swal.fire({
        title: `Are you sure you want delete ${movie.name}?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {

          await movieRepo.deleteMovie(movie.id);
          const response = await movieRepo.getMovies();
          dispatch(setMovies(response));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Movie ${movie.name} deleted`,
            showConfirmButton: false,
            timer: 2500
          });

        }
      })
    } catch (error) {
      console.log(error);
    }
  };



  // crud functions

  const saveMovie = async (movie: MovieFormValues) => {
    try {
      if (movie.id === 0) {
        const { id, ...rest } = movie;
        await movieRepo.saveMovie(rest);
        const response = await movieRepo.getMovies();
        dispatch(setMovies(response));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Movie ${movie.name} created`,
          showConfirmButton: false,
          timer: 2500
        });
      } else {
        const { id, ...rest } = movie;

        await movieRepo.updateMovie(id!, rest);

        const response = await movieRepo.getMovies();
        dispatch(setMovies(response));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Movie ${movie.name} updated`,
          showConfirmButton: false,
          timer: 2500
        });
      }
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  // util functions

  const addNewMovie = () => {
    setMovie({
      id: 0,
      name: '',
      budget: 0,
      date: '',
      duration: 0,
    })
    setShowModal(true);
  }


  const closModal = () => {
    setShowModal(false);
  }

  const nextPage = async (page: number) => {
    const response = await movieRepo.getMovies(page);
    dispatch(setMovies(response));
  };
  const prevPage = async (page: number) => {
    const response = await movieRepo.getMovies(page);
    dispatch(setMovies(response));
  };



  useEffect(() => {
    const getMovies = async () => {
      const response = await movieRepo.getMovies();
      dispatch(setMovies(response));
    }
    getMovies();
  }, [movieRepo, dispatch]);


  return (
    <div className="grid grid-cols-1 ">
      <button
        onClick={addNewMovie}
        className=" ml-5 sm:w-1/6 border-2 rounded-md border-cyan-400 bg-cyan-800 text-white p-2"
      >Add new Movie</button>
      <Table
        data={data}
        deleteData={deleteMovie}
        editData={editMovie}
        headers={headers}
        showData={showMovie}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      {
        showModal &&
        <Modal >
          <MovieForm
            movie={movie}
            closeModal={closModal}
            saveMovie={saveMovie}
          />
        </Modal>
      }
      {
        showDetail &&
        <Modal >
          <h2 className="text-2xl text-center mb-2 font-bold">{movie.name}</h2>
          <div className="grid grid-cols-2">
            <span className="font-semibold">Name: </span>
            <span>{movie.name}</span>

            <span className="font-semibold">Budegt: </span>
            <span>${movie.budget}</span>

            <span className="font-semibold">Date: </span>
            <span >{//@ts-ignore 
              dateTransform(movie.date)
            }</span>

            <span className="font-semibold">Duration: </span>
            <span >{movie.duration}</span>
            <button onClick={() => setShowDetail(false)} className="bg-red-600 text-white border-red-300 rounded-md mt-2 p-2 ">Close</button>
          </div>
        </Modal>
      }
    </div>
  )
}
export default Movies