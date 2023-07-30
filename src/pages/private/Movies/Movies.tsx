import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../../redux";
import { Table } from "../../../components"
import { MoviesRepository } from "../../../services";
import { setMovies } from "../../../redux/states/movie";
import { ITableHeaders, Movie } from "../../../interfaces";

const Movies = () => {

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
  const deleteMovie = (row: Movie) => console.log(row);


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
    <>
      {
        <Table
          data={data}
          deleteData={deleteMovie}
          editData={editMovie}
          headers={headers}
          showData={showMovie}
          nextPage={nextPage}
          prevPage={prevPage}
        />}
    </>
  )
}
export default Movies