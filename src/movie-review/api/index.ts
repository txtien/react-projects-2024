import { BASE_API } from "../../api";
import { IMovie } from "./types";

export const getMovies = async (): Promise<IMovie[]> => {
  const response = await fetch(BASE_API + "/movies/");
  const data = await response.json();
  return data;
};
