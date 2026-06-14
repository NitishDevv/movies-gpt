import React from "react";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movieId, posterPath }) => {
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleMovieClick = () => {
    navigate("/movie/" + movieId);
  };

  return (
    <button
      className="w-28 shrink-0 text-left transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white sm:w-36 md:w-44 lg:w-48"
      onClick={handleMovieClick}
      type="button"
    >
      <img
        className="aspect-[2/3] w-full rounded object-cover"
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
      />
    </button>
  );
};

export default MovieCard;
