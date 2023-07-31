import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { AppStore } from "../../../redux";
import { Modal, Table } from "../../../components"
import { MoviesRepository } from "../../../services";
import { setMovies } from "../../../redux/states/movie";
import { ITableHeaders, Movie, MovieFormValues } from "../../../interfaces";
import { MovieForm } from "./components";

const Movies = () => {

  const [showModal, setShowModal] = useState(false);

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
  const showMovie = (row: Movie) => console.log(row);
  const editMovie = (row: Movie) => console.log(row);

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
        delete movie.id;
        await movieRepo.saveMovie(movie);
        const response = await movieRepo.getMovies();
        dispatch(setMovies(response));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Movie ${movie.name} created`,
          showConfirmButton: false,
          timer: 2500
        })
      }
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  // util functions

  const addNewMovie = () => {
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
        <Modal>
          <MovieForm
            closeModal={closModal}
            saveMovie={saveMovie}
          />
        </Modal>
      }
    </div>
  )
}
export default Movies