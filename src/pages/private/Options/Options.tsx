import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppStore } from "../../../redux";
import { setOptions } from "../../../redux/states/option";

import { Table } from "../../../components";
import { OptionsRepository } from "../../../services";
import { ITableHeaders, Option } from "../../../interfaces";

const Options = () => {
  const dispatch = useDispatch();
  const data = useSelector((store: AppStore) => store.option);
  const optionRepo = useMemo(() => new OptionsRepository(), []);

  const headers: ITableHeaders[] = [
    { key: "name", label: "Name" },
    { key: "path", label: "Path" },
  ];

  const nextPage = async (page: number) => {
    const response = await optionRepo.getOptions(page);
    dispatch(setOptions(response));
  };
  const prevPage = async (page: number) => {
    const response = await optionRepo.getOptions(page);
    dispatch(setOptions(response));
  };

  const deleteOption = (option: Option) => { console.log(option) }
  const editOption = (option: Option) => { console.log(option) }
  const showOption = (option: Option) => { console.log(option) }


  useEffect(() => {
    const getMovies = async () => {
      const response = await optionRepo.getOptions();
      dispatch(setOptions(response));
    }
    getMovies();
  }, [optionRepo, dispatch]);

  return (
    <div className="grid grid-cols-1 ">
      <Table
        data={data}
        deleteData={deleteOption}
        editData={editOption}
        headers={headers}
        showData={showOption}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  )
}

export default Options