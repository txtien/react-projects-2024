import { useEffect, useState } from "react";
import { Header } from "./components/header/Header";
import "./index.scss";
import { IMovie } from "./api/types";
import { getMovies } from "./api";
import { Input } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { MovieCard } from "./components/card/Card";

const MovieReview = () => {
  
  // const [params, setParams] = useState({
  //   title: "",
  // });

  const [movies, setMovies] = useState<IMovie[]>([]);
 
  useEffect(() => {
    getMovies().then((res) => {
      setMovies(res);
    });
  }, []);

  return (
    <div className="movie-wrapper">
      <Header />
      <div className="movie-container">
        <div className="section-title">Phim đang chiếu</div>
        <div className="search-wrap">
          <div className="search-field">
            <Input placeholder="Tìm kiếm" />
            <SearchIcon size={16} className="icon" />
          </div>
        </div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieReview;
