import "./Header.scss";
import Imdb from "../../../assets/imdb.svg";
import Tomatoes from "../../../assets/rotten_tomatoes.svg";
import { PlayIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="movie-header">
      <div className="overlay"></div>
      <div className="content">
        <p className="title">Shang-Chi and the Legend of the Ten Rings</p>
        <div className="rating">
          <div className="rating-item imdb">
            <img src={Imdb} alt="imdb" />
            <span className="rated">86.0 / 100</span>
          </div>
          <div className="rating-item tomatoes">
            <img src={Tomatoes} alt="tomatoes" />
            <span className="rated">77%</span>
          </div>
        </div>
        <button className="trailer-btn">
          <span className="icon">
            <PlayIcon fill="#333" size={16} />
          </span>
          <span>Watch Trailer</span>
        </button>
      </div>
    </div>
  );
};
